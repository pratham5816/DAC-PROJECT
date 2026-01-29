using Microsoft.AspNetCore.Mvc;
using VehicleTracker.API.Dtos;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        // ---------------- GET ALL ----------------
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _customerRepository.GetAllAsync();

            var response = customers.Select(c => new CustomerResponseDto
            {
                CustomerId = c.CustomerId,
                Name = c.Name,
                Email = c.Email
            });

            return Ok(new ApiResponseDto<IEnumerable<CustomerResponseDto>>
            {
                Success = true,
                Code = ErrorCodes.Success,
                Message = "Customers retrieved successfully",
                Data = response
            });
        }

        // ---------------- GET BY ID ----------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);

            if (customer == null)
            {
                return NotFound(new ApiResponseDto<object>
                {
                    Success = false,
                    Code = ErrorCodes.NotFound,
                    Message = "Customer not found"
                });
            }

            return Ok(new ApiResponseDto<CustomerResponseDto>
            {
                Success = true,
                Code = ErrorCodes.Success,
                Message = "Customer retrieved successfully",
                Data = new CustomerResponseDto
                {
                    CustomerId = customer.CustomerId,
                    Name = customer.Name,
                    Email = customer.Email
                }
            });
        }

        // ---------------- REGISTER ----------------
        [HttpPost("register")]
        public async Task<IActionResult> Register(CustomerCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponseDto<object>
                {
                    Success = false,
                    Code = ErrorCodes.InvalidInput,
                    Message = "Invalid customer data"
                });
            }

            var existingCustomer =
                await _customerRepository.GetByEmailAsync(dto.Email);

            if (existingCustomer != null)
            {
                return BadRequest(new ApiResponseDto<object>
                {
                    Success = false,
                    Code = ErrorCodes.AlreadyExists,
                    Message = "Email already registered"
                });
            }

            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _customerRepository.AddAsync(customer);

            return Ok(new ApiResponseDto<object>
            {
                Success = true,
                Code = ErrorCodes.Success,
                Message = "Customer registered successfully"
            });
        }

        // ---------------- UPDATE ----------------
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CustomerUpdateDto dto)
        {
            if (!ModelState.IsValid || id != dto.CustomerId)
            {
                return BadRequest(new ApiResponseDto<object>
                {
                    Success = false,
                    Code = ErrorCodes.InvalidInput,
                    Message = "Invalid request data"
                });
            }

            var customer = await _customerRepository.GetByIdAsync(id);

            if (customer == null)
            {
                return NotFound(new ApiResponseDto<object>
                {
                    Success = false,
                    Code = ErrorCodes.NotFound,
                    Message = "Customer not found"
                });
            }

            customer.Name = dto.Name;
            customer.Email = dto.Email;

            await _customerRepository.UpdateAsync(customer);

            return Ok(new ApiResponseDto<object>
            {
                Success = true,
                Code = ErrorCodes.Success,
                Message = "Customer updated successfully"
            });
        }

        // ---------------- DELETE ----------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);

            if (customer == null)
            {
                return NotFound(new ApiResponseDto<object>
                {
                    Success = false,
                    Code = ErrorCodes.NotFound,
                    Message = "Customer not found"
                });
            }

            await _customerRepository.DeleteAsync(id);

            return Ok(new ApiResponseDto<object>
            {
                Success = true,
                Code = ErrorCodes.Success,
                Message = "Customer deleted successfully"
            });
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("API is alive");
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using VehicleTracker.APIs.Dtos;
using VehicleTracker.DAL.Interfaces;

[ApiController]
[Route("api/auth/customer")]
public class CustomerAuthController : ControllerBase
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerAuthController(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(CustomerLoginDto dto)
    {
        // 1️⃣ Basic input validation
        if (string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new ApiResponseDto<object>
            {
                Success = false,
                Code = ErrorCodes.InvalidInput,
                Message = "Email and password are required"
            });
        }

        // 2️⃣ Find customer
        var customer = await _customerRepository.GetByEmailAsync(dto.Email);

        if (customer == null)
        {
            return Unauthorized(new ApiResponseDto<object>
            {
                Success = false,
                Code = ErrorCodes.InvalidCredentials,
                Message = "Invalid email or password"
            });
        }

        // 3️⃣ Verify password (BCrypt)
        var isValid =
            BCrypt.Net.BCrypt.Verify(dto.Password, customer.Password);

        if (!isValid)
        {
            return Unauthorized(new ApiResponseDto<object>
            {
                Success = false,
                Code = ErrorCodes.InvalidCredentials,
                Message = "Invalid email or password"
            });
        }

        // 4️⃣ Success
        return Ok(new ApiResponseDto<object>
        {
            Success = true,
            Code = ErrorCodes.Success,
            Message = "Login successful",
            Data = new
            {
                customer.CustomerId,
                customer.Email
            }
        });
    }
}
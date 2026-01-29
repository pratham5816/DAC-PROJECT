using Microsoft.EntityFrameworkCore;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.DAL.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly VehicleTrackerDbContext _context;


    public CustomerRepository(VehicleTrackerDbContext context)
    {
        _context = context;
    }


    public async Task<IEnumerable<Customer>> GetAllAsync()
    {
        return await _context.Customers.ToListAsync();
    }


    public async Task<Customer?> GetByIdAsync(int id)
    {
        return await _context.Customers.FindAsync(id);
    }


    public async Task<Customer?> GetByEmailAsync(string email)
    {
        return await _context.Customers
        .FirstOrDefaultAsync(c => c.Email == email);
    }


    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Customers
        .AnyAsync(c => c.Email == email);
    }


    public async Task AddAsync(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateAsync(Customer customer)
    {
        _context.Customers.Update(customer);
        await _context.SaveChangesAsync();
    }


    public async Task DeleteAsync(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
            return;


        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
    }
}
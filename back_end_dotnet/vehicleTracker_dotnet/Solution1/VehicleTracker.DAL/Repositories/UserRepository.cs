using Microsoft.EntityFrameworkCore;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.DAL.Repositories;

public class UserRepository : IUserRepository
{
    private readonly VehicleTrackerDbContext _context;


    public UserRepository(VehicleTrackerDbContext context)
    {
        _context = context;
    }


    public async Task<User?> GetById(int id)
    => await _context.User.FindAsync(id);


    public async Task<User?> GetByEmail(string email)
    => await _context.User.FirstOrDefaultAsync(u => u.Email == email);


    public async Task Add(User user)
    {
        _context.User.Add(user);
        await _context.SaveChangesAsync();
    }
}
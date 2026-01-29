using Microsoft.EntityFrameworkCore;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.DAL.Repositories;

public class DriverRepository : IDriverRepository
{
    private readonly VehicleTrackerDbContext _context;


    public DriverRepository(VehicleTrackerDbContext context)
    {
        _context = context;
    }


    public async Task<Driver?> GetById(int driverId)
    => await _context.Driver.FindAsync(driverId);


    public async Task<Driver?> GetByEmail(string email)
    => await _context.Driver.FirstOrDefaultAsync(d => d.Email == email);


    public async Task Add(Driver driver)
    {
        _context.Driver.Add(driver);
        await _context.SaveChangesAsync();
    }


    public async Task SetActive(int driverId, bool isActive)
    {
        var driver = await _context.Driver.FindAsync(driverId);
        if (driver == null) return;


        driver.IsActive = isActive;
        await _context.SaveChangesAsync();
    }
}
using Microsoft.EntityFrameworkCore;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.DAL.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly VehicleTrackerDbContext _context;


    public VehicleRepository(VehicleTrackerDbContext context)
    {
        _context = context;
    }


    public async Task<Vehicle?> GetByNumber(string vehicleNumber)
    => await _context.Vehicle
    .Include(v => v.User)
    .FirstOrDefaultAsync(v => v.VechicleNumber == vehicleNumber);


    public async Task Add(Vehicle vehicle)
    {
        _context.Vehicle.Add(vehicle);
        await _context.SaveChangesAsync();
    }


    public async Task<List<Vehicle>> GetByUser(int userId)
    => await _context.Vehicle
    .Where(v => v.User.Id == userId)
    .ToListAsync();
}
using Microsoft.EntityFrameworkCore;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.DAL.Repositories;

public class DriveRepository : IDriveRepository
{
    private readonly VehicleTrackerDbContext _context;


    public DriveRepository(VehicleTrackerDbContext context)
    {
        _context = context;
    }


    public async Task StartDrive(Drive drive)
    {
        _context.Drive.Add(drive);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateLocation(int driveId, double latitude, double longitude)
    {
        var drive = await _context.Drive.FindAsync(driveId);
        if (drive == null) return;


        drive.Latitude = latitude;
        drive.Longitude = longitude;


        await _context.SaveChangesAsync();
    }


    public async Task CompleteDrive(int driveId)
    {
        var drive = await _context.Drive.FindAsync(driveId);
        if (drive == null) return;


        drive.Status = "COMPLETED";
        await _context.SaveChangesAsync();
    }


    public async Task<Drive?> GetActiveDriveByVehicle(string vehicleNumber)
    {
        return await _context.Drive
        .Include(d => d.Vehicle)
        .Include(d => d.Driver)
        .FirstOrDefaultAsync(d =>
        d.Vehicle.VechicleNumber == vehicleNumber &&
        d.Status == "ACTIVE");
    }


    public async Task<Drive?> GetById(int driveId)
    {
        return await _context.Drive
        .Include(d => d.Vehicle)
        .Include(d => d.Driver)
        .FirstOrDefaultAsync(d => d.DriveId == driveId);
    }
}

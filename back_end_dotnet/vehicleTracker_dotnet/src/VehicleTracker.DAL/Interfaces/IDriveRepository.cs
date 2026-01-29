using VehicleTracker.Models;

namespace VehicleTracker.DAL.Interfaces;

public interface IDriveRepository
{
    Task StartDrive(Drive drive);
    Task UpdateLocation(int driveId, double latitude, double longitude);
    Task CompleteDrive(int driveId);
    Task<Drive?> GetActiveDriveByVehicle(string vehicleNumber);
    Task<Drive?> GetById(int driveId);
}
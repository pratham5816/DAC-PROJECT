using VehicleTracker.Models;

namespace VehicleTracker.DAL.Interfaces;

public interface IVehicleRepository
{
    Task<Vehicle?> GetByNumber(string vehicleNumber);
    Task Add(Vehicle vehicle);
    Task<List<Vehicle>> GetByUser(int userId);
}
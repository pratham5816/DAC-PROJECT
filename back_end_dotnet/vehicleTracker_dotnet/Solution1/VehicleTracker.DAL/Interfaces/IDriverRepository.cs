using VehicleTracker.Models;

namespace VehicleTracker.DAL.Interfaces;

public interface IDriverRepository
{
    Task<Driver?> GetById(int driverId);
    Task<Driver?> GetByEmail(string email);
    Task Add(Driver driver);
    Task SetActive(int driverId, bool isActive);
}
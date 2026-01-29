using VehicleTracker.Models;

namespace VehicleTracker.DAL.Interfaces;

public interface IUserRepository
{
    Task<User?> GetById(int id);
    Task<User?> GetByEmail(string email);
    Task Add(User user);
}
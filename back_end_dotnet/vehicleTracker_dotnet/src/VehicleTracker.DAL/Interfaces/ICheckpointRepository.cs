using VehicleTracker.Models;

namespace VehicleTracker.DAL.Interfaces;

public interface ICheckpointRepository
{
    Task<List<Checkpoint>> GetAll();
    Task<Checkpoint?> GetById(int id);
    Task Add(Checkpoint checkpoint);
}

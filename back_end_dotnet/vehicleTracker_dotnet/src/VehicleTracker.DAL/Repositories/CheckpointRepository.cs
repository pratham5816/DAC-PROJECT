using Microsoft.EntityFrameworkCore;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.Models;

namespace VehicleTracker.DAL.Repositories;

public class CheckpointRepository : ICheckpointRepository
{
    private readonly VehicleTrackerDbContext _context;


    public CheckpointRepository(VehicleTrackerDbContext context)
    {
        _context = context;
    }


    public async Task<List<Checkpoint>> GetAll()
    => await _context.Checkpoint.ToListAsync();


    public async Task<Checkpoint?> GetById(int id)
    => await _context.Checkpoint.FindAsync(id);


    public async Task Add(Checkpoint checkpoint)
    {
        _context.Checkpoint.Add(checkpoint);
        await _context.SaveChangesAsync();
    }
}
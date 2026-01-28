using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;



namespace VehicleTracker.DAL;

public class VehicleTrackerDbContextFactory
: IDesignTimeDbContextFactory<VehicleTrackerDbContext>
{
    public VehicleTrackerDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();


        var connectionString = configuration.GetConnectionString("DefaultConnection");


        var optionsBuilder = new DbContextOptionsBuilder<VehicleTrackerDbContext>();


        optionsBuilder.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
        );


        return new VehicleTrackerDbContext(optionsBuilder.Options);
    }
}
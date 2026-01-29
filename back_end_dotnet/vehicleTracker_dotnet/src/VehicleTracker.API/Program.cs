using VehicleTracker.DAL;
using VehicleTracker.DAL.Interfaces;
using VehicleTracker.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace VehicleTracker.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // ---------------- SERVICES ----------------

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<VehicleTrackerDbContext>(options =>
            options.UseMySql(
                builder.Configuration.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(
                    builder.Configuration.GetConnectionString("DefaultConnection")
                )
            )
        );

        // Repositories (ALL before Build)
        builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
        builder.Services.AddScoped<IDriverRepository, DriverRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IDriverRepository, DriverRepository>();
        builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
        builder.Services.AddScoped<ICheckpointRepository, CheckpointRepository>();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });

        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        var app = builder.Build();

        // ---------------- MIDDLEWARE ----------------

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("AllowAll");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();

 
    }
}
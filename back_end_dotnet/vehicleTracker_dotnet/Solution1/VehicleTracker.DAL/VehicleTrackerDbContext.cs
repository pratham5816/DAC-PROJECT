using Microsoft.EntityFrameworkCore;
using VehicleTracker.Models;

namespace VehicleTracker.DAL
{
    public class VehicleTrackerDbContext : DbContext
    {
        public VehicleTrackerDbContext(DbContextOptions<VehicleTrackerDbContext> options)
            : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<Driver> Driver { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Drive> Drive { get; set; }
        public DbSet<Checkpoint> Checkpoint { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /* ---------------- Customer ---------------- */
              modelBuilder.Entity<Customer>()
                .HasIndex(c => c.Email)
                .IsUnique();

            /* ---------------- USER ---------------- */
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);

                entity.Property(u => u.Name)
                      .IsRequired();

                entity.Property(u => u.Email)
                      .IsRequired();

                entity.HasIndex(u => u.Email)
                      .IsUnique();
            });

            /* ---------------- VEHICLE ---------------- */
            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.HasKey(v => v.VechicleNumber);

                entity.Property(v => v.VechicleNumber)
                      .HasMaxLength(30);

                entity.Property(v => v.VehicleType)
                      .HasMaxLength(30)
                      .IsRequired();

                entity.Property(v => v.Challan_Exp)
                      .HasDefaultValue(0);

                entity.Property(v => v.Vehicle_Exp)
                      .HasDefaultValue(0);

                entity.HasOne(v => v.User)
                      .WithMany(u => u.Vehicles)
                      .HasForeignKey("user")
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Restrict);
            });

            /* ---------------- DRIVER ---------------- */
            modelBuilder.Entity<Driver>(entity =>
            {
                entity.HasKey(d => d.DriverId);

                entity.Property(d => d.DriverName)
                      .IsRequired();

                entity.Property(d => d.LicenseNumber)
                      .IsRequired();

                entity.Property(d => d.Email)
                      .IsRequired();

                entity.HasIndex(d => d.Email)
                      .IsUnique();

                entity.Property(d => d.IsActive)
                      .HasDefaultValue(false);
            });

            /* ---------------- CHECKPOINT ---------------- */
            modelBuilder.Entity<Checkpoint>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Name)
                      .IsRequired();

                entity.HasIndex(c => c.Name)
                      .IsUnique();

                entity.Property(c => c.Latitude)
                      .IsRequired();

                entity.Property(c => c.Longitude)
                      .IsRequired();

                entity.Property(c => c.RadiusKm)
                      .IsRequired();
            });

            /* ---------------- DRIVE (CORE MODEL) ---------------- */
            modelBuilder.Entity<Drive>(entity =>
            {
                entity.HasKey(d => d.DriveId);

                entity.Property(d => d.Status)
                      .HasMaxLength(20)
                      .IsRequired();

                entity.Property(d => d.Latitude)
                      .HasDefaultValue(0.0);

                entity.Property(d => d.Longitude)
                      .HasDefaultValue(0.0);

                entity.HasOne(d => d.Vehicle)
                      .WithMany()
                      .HasForeignKey("vehicle_id")
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.Driver)
                      .WithMany()
                      .HasForeignKey("driver_id")
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.Start_Point)
                      .WithMany()
                      .HasForeignKey("started_point")
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.End_Point)
                      .WithMany()
                      .HasForeignKey("ended_point")
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
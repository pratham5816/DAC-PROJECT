using System.ComponentModel.DataAnnotations;

namespace VehicleTracker.Models;

public class Drive
{
    [Key]
    public int DriveId { get; set; }


    [Required]
    public Vehicle Vehicle { get; set; }


    [Required]
    public Driver Driver { get; set; }


    [Required, MaxLength(20)]
    public string Status { get; set; }
    // CREATED, ACTIVE, COMPLETED, CANCELLED


    public double Longitude { get; set; } = 0.0;
    public double Latitude { get; set; } = 0.0;


    public Checkpoint Start_Point { get; set; }
    public Checkpoint End_Point { get; set; }

}

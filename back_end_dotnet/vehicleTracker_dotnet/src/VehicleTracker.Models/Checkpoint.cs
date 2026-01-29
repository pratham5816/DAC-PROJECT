using System.ComponentModel.DataAnnotations;

namespace VehicleTracker.Models;

public class Checkpoint
{
    [Key]
    public int Id { get; set; }


    [Required]
    public string Name { get; set; }


    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double RadiusKm { get; set; }
}
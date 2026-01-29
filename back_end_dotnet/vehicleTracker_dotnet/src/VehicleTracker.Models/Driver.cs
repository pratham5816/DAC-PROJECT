using System.ComponentModel.DataAnnotations;

namespace VehicleTracker.Models;

public class Driver
{

    [Key]
    public int DriverId { get; set; }


    [Required]
    public string DriverName { get; set; } 


    [Required]
    public string LicenseNumber { get; set; }


    [Required]
    public string Email { get; set; } 


    [Required]
    public string Password { get; set; }


    public bool IsActive { get; set; } = false;


}

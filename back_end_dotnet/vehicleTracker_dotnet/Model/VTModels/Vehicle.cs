using System.ComponentModel.DataAnnotations;

namespace VehicleTracker.Models;

public class Vehicle
{
    [Key]
    [MaxLength(30)]
    public string VechicleNumber { get; set; }


    [Required, MaxLength(30)]
    public string VehicleType { get; set; }


    public int Challan_Exp { get; set; } = 0;


    public int Vehicle_Exp { get; set; } = 0;


    [Required]
    public User User { get; set; }


}

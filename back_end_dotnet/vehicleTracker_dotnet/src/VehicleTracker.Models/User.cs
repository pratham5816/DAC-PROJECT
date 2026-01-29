using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VehicleTracker.Models;

public class User
{
    [Key]
    public int Id { get; set; }


    [Required]
    public string Name { get; set; }


    [Required]
    public string Email { get; set; }


    [Required]
    public string Password { get; set; }


    [JsonIgnore]
    public ICollection<Vehicle> Vehicles { get; set; }


}

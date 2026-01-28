using System.ComponentModel.DataAnnotations;

namespace VehicleTracker.APIs.Dtos;

public class CustomerUpdateDto
{
    [Required]
    public int CustomerId { get; set; }


    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = null!;


    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = null!;
}
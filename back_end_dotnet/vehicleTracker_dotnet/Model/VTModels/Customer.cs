using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VehicleTracker.Models;

public class Customer
{
    [Key]
    public int CustomerId { get; set; }


    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, MinimumLength = 2,
    ErrorMessage = "Name must be between 2 and 100 characters")]
    public string Name { get; set; } = null!;


    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    [StringLength(150)]
    public string Email { get; set; } = null!;


    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; } = null!;
}

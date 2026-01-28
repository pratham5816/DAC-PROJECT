namespace VehicleTracker.APIs.Dtos;

public class CustomerResponseDto
{
    public int CustomerId { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
}

namespace VehicleTracker.API.Dtos;

public class ApiResponseDto<T>
{
    public bool Success { get; set; }
    public string Code { get; set; } = null!;
    public string Message { get; set; } = null!;
    public T? Data { get; set; }
}
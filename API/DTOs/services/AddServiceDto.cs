namespace API.DTOs;

public class AddServiceDto
{
    public string Name { get; set; }
    public string ClientEmail { get; set; }
    public string ClientUsername { get; set; }
    public List<string> Files { get; set; } = new();
    public Entities.StatusOfService CurrentStatus { get; set; } = Entities.StatusOfService.NotStarted;
    public int Price { get; set; }
    public DateTime PlannedDateOfCompletion { get; set; }
    public string Description { get; set; }
}
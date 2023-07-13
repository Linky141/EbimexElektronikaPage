namespace API.DTOs;

public class ServiceDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ClientEmail { get; set; }
    public string ClientUsername { get; set; }
    public List<PictureUrlDto> PictureUrls { get; set; } = new();
    public Entities.StatusOfService CurrentStatus { get; set; } = Entities.StatusOfService.NotStarted;
    public int Price { get; set; }
    public DateTime PlannedDateOfCompletion { get; set; }
    public string Description { get; set; }
    public List<CommentDto> Comments { get; set; } = new();
}
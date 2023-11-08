namespace API.Entities;

public class Service
{
    public int Id { get; set; }
    public string ClientEmail { get; set; }
    public string ClientUsername { get; set; }
    public string Name { get; set; }
    public List<PictureUrlService> PictureUrls { get; set; } = new();
    public StatusOfService CurrentStatus { get; set; } = StatusOfService.NotStarted;
    public int Price { get; set; }
    public DateTime PlannedDateOfCompletion { get; set; } = DateTime.UtcNow;
    public string Description { get; set; }
    public List<Comment> Comments { get; set; } = new();
}
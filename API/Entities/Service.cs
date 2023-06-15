namespace API.Entities;

public class Service
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<string>? PicturesUrl { get; set; } = new();
    public string? CurrentState { get; set; }
    public int Price { get; set; }
    public DateTime PlannedDateOfCompletion { get; set; }
    public string? Description { get; set; }
    public List<Comment>? Comments { get; set; } = new();
}
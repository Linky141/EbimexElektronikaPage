namespace API.DTOs;

public class UpdateHomePageDto
{
    public int Id { get; set; }
    public string Header { get; set; }
    public string Description { get; set; }
    public List<string> Files { get; set; } = new();
}
namespace API.DTOs;

public class HomePageDto
{
    public int Id { get; set; }
    public string Header { get; set; }
    public string Description { get; set; }
    public List<PictureUrlDto> PictureUrls { get; set; } = new();
}
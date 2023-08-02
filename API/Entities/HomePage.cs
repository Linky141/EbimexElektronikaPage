namespace API.Entities;

public class HomePage
{
    public int Id { get; set; }
    public string Header { get; set; }
    public string Description { get; set; }
    public List<PictureUrlHomePage> PictureUrls { get; set; } = new();
}
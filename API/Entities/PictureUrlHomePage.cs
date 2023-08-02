namespace API.Entities;

public class PictureUrlHomePage
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string PublicId { get; set; }


    public int HomePageId { get; set; }
    public HomePage HomePage { get; set; }
}
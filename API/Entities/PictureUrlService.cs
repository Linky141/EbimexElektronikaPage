namespace API.Entities;

public class PictureUrlService
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string PublicId { get; set; }


    public int ServiceId { get; set; }
    public Service Service { get; set; }
}
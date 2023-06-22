namespace API.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string User { get; set; }
    public DateTime DateTime { get; set; }

    public int ServiceId { get; set; }
    public Service Service { get; set; }
}
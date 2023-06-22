namespace API.Entities;

public class InfoAnnouncement
{
    public int Id { get; set; }
    public DateTime DateAndTime { get; set; }
    public string Content { get; set; }

    public int InfoId { get; set; }
    public Info Info { get; set; }
}
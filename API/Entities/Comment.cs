namespace API.Entities;

public class Comment
{
    public int Id { get; set; }    
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    public string? Content { get; set; }
}
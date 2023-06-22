namespace API.DTOs;

public class CommentDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string User { get; set; }
    public DateTime DateTime { get; set; }
}
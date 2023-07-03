namespace API.DTOs;

public class AddNewCommentDto
{
    public int Id { get; set; }
    public CommentDto Comment { get; set; } = new();
}
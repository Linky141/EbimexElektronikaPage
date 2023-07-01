namespace API.DTOs;

public class UpdateCommentsDto
{
    public int Id { get; set; }
    public List<CommentDto> Comments { get; set; } = new();
}
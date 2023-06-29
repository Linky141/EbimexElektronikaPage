namespace API.DTOs;

public class UpdateContactContactDto
{
    
    public int Id { get; set; }

    public string Email { get; set; }
    public string Phone { get; set; }

    public List<ContactCustomDto> ContactCustoms { get; set; } = new();
}
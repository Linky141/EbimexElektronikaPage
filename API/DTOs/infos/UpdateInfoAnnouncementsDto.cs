namespace API.DTOs;

public class UpdateInfoAnnouncementsDto
{
    public int Id { get; set; }

    public List<InfoAnnouncementDto> InfoAnnouncements { get; set; } = new();
}
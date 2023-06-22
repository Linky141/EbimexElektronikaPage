namespace API.Entities;

public class Info
{
    public int Id { get; set; }
    public string OpeningHoursMondayStart { get; set; }
    public string OpeningHoursMondayEnd { get; set; }
    public string OpeningHoursTuesdayStart { get; set; }
    public string OpeningHoursTuesdayEnd { get; set; }
    public string OpeningHoursWednesdayStart { get; set; }
    public string OpeningHoursWednesdayEnd { get; set; }
    public string OpeningHoursThursdayStart { get; set; }
    public string OpeningHoursThursdayEnd { get; set; }
    public string OpeningHoursFridayStart { get; set; }
    public string OpeningHoursFridayEnd { get; set; }
    public string OpeningHoursSaturdayStart { get; set; }
    public string OpeningHoursSaturdayEnd { get; set; }
    public string OpeningHoursSundayStart { get; set; }
    public string OpeningHoursSundayEnd { get; set; }

    public List<InfoAnnouncement> InfoAnnouncements { get; set; } = new();
}
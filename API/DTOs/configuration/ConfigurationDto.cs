namespace API.DTOs;

public class ConfigurationDto
{
    public int Id { get; set; }
    public Entities.ConfigurationEnabledSections InfoEnabled { get; set; }
    public Entities.ConfigurationEnabledSections ContactsEnabled { get; set; }
    public Entities.ConfigurationEnabledSections ServicesEnabled { get; set; }
}
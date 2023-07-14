namespace API.Entities;

public class Configuration
{
    public int Id { get; set; }
    public ConfigurationEnabledSections InfoEnabled { get; set; }
    public ConfigurationEnabledSections ContactsEnabled { get; set; }
    public ConfigurationEnabledSections ServicesEnabled { get; set; }
}
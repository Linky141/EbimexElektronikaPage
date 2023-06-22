namespace API.Entities;

public class ContactCustom
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }

    public int ContactId { get; set; }
    public Contact Contact { get; set; }
}
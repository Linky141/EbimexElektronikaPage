namespace API.Entities;

public class Contact
{
    public int Id { get; set; }

    public string Email { get; set; }
    public string Phone { get; set; }
    public string Email2 { get; set; }
    public string Phone2 { get; set; }

    public string AddressCountry { get; set; }
    public string AddressCity { get; set; }
    public string AddressStreet { get; set; }
    public string AddressNumber1 { get; set; }
    public string AddressNumber2 { get; set; }
    public string AddressPostal { get; set; }

    public List<ContactCustom> ContactCustoms { get; set; } = new();
}
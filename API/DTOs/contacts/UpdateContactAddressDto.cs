namespace API.DTOs;

public class UpdateContactAddressDto
{
    public int Id { get; set; }

    public string AddressCountry { get; set; }
    public string AddressCity { get; set; }
    public string AddressStreet { get; set; }
    public string AddressNumber1 { get; set; }
    public string AddressNumber2 { get; set; }
    public string AddressPostal { get; set; }
}
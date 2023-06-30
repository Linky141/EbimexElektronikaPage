namespace API.Controllers;

public class ContactsController : BaseApiController
{
    private readonly IMapper mapper;
    private readonly ServiceContext serviceContext;
    public ContactsController(IMapper mapper, ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
        this.mapper = mapper;

    }

    [HttpGet(Name = "GetContact")]
    public async Task<ActionResult<List<DTOs.ContactDto>>> GetContact()
    {
        var contacts = await RetrieveContacts();
        if (contacts == null)
            return NotFound();
        var contactDto = contacts.Select(c => mapper.Map<DTOs.ContactDto>(c)).ToList();
        return Ok(contactDto);
    }

    [HttpPut("UpdateAddress")]
    public async Task<ActionResult<Entities.Contact>> UpdateAddress(DTOs.UpdateContactAddressDto updateContactAddressDto)
    {
        var contact = RetrieveContact(updateContactAddressDto.Id).Result;

        if (updateContactAddressDto.AddressCity == contact.AddressCity &&
        updateContactAddressDto.AddressCountry == contact.AddressCountry &&
        updateContactAddressDto.AddressNumber1 == contact.AddressNumber1 &&
        updateContactAddressDto.AddressNumber2 == contact.AddressNumber2 &&
        updateContactAddressDto.AddressPostal == contact.AddressPostal &&
        updateContactAddressDto.AddressStreet == contact.AddressStreet
        )
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });

        if (contact == null)
            return NotFound();

        mapper.Map(updateContactAddressDto, contact);


        var result = await serviceContext.SaveChangesAsync() > 0;

        var dto = CreateDto(contact);

        if (result)
            return CreatedAtRoute("GetContact", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating address" });
    }

    [HttpPut("UpdateContactData")]
    public async Task<ActionResult<Entities.Contact>> UpdateDontactData(DTOs.UpdateContactContactDto updateContactContactDto)
    {
        var contact = RetrieveContact(updateContactContactDto.Id).Result;

        bool contactCustomsTheSame = true;
        if (updateContactContactDto.ContactCustoms.Count == 0 || contact.ContactCustoms.Count == 0)
            contactCustomsTheSame = false;
        foreach (var customContact in updateContactContactDto.ContactCustoms)
        {
            if (contact.ContactCustoms.Any(item => customContact.Id != item.Id || customContact.Name != item.Name || customContact.Content != item.Content))
                contactCustomsTheSame = false;
        }

        if (updateContactContactDto.Email == contact.Email &&
        updateContactContactDto.Phone == contact.Phone &&
        contactCustomsTheSame)
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });


        if (contact == null)
            return NotFound();

        contact.ContactCustoms = new();
        mapper.Map(updateContactContactDto, contact);
        contact.ContactCustoms.ForEach(c => c.Id = 0);

        var result = await serviceContext.SaveChangesAsync() > 0;

        var dto = CreateDto(contact);

        if (result)
            return CreatedAtRoute("GetContact", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating contact" });
    }

    private List<DTOs.ContactDto> CreateDto(Entities.Contact contact)
    {
        return new List<DTOs.ContactDto>{
        new DTOs.ContactDto
        {
            AddressCity = contact.AddressCity,
            AddressCountry = contact.AddressCountry,
            AddressNumber1 = contact.AddressNumber1,
            AddressNumber2 = contact.AddressNumber2,
            AddressPostal = contact.AddressPostal,
            AddressStreet = contact.AddressStreet,
            Phone = contact.Phone,
            Email = contact.Email,
            ContactCustoms = contact.ContactCustoms.Select(item =>
            new DTOs.ContactCustomDto() { Id = item.Id, Name = item.Name, Content = item.Content }
           ).ToList()
        }};
    }


    private async Task<List<Entities.Contact>> RetrieveContacts()
    {
        return await serviceContext.Contacts
        .Include(c => c.ContactCustoms)
        .ToListAsync();
    }

    private async Task<Entities.Contact> RetrieveContact(int id)
    {
        return await serviceContext.Contacts
        .Include(c => c.ContactCustoms)
        .SingleOrDefaultAsync(c => c.Id == id);
    }
}
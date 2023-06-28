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
        var contact = await RetrieveContact();
        if (contact == null)
            return NotFound();
        var contactDto = contact.Select(c => mapper.Map<DTOs.ContactDto>(c)).ToList();
        return Ok(contactDto);
    }

    [HttpPut("UpdateAddress")]
    public async Task<ActionResult<Entities.Contact>> UpdateAddress([FromForm] DTOs.UpdateContactAddressDto updateContactAddressDto)
    {
        var contact = await serviceContext.Contacts.FindAsync(updateContactAddressDto.Id);

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

        List<DTOs.ContactDto> dto = new();
        dto.Add(new DTOs.ContactDto
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
        });

        if (result)
            return CreatedAtRoute("GetContact", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating address" });
    }

    [HttpPut("UpdateContactData")]
    public async Task<ActionResult<Entities.Contact>> UpdateDontactData([FromForm] DTOs.UpdateContactContactDto updateContactContactDto)
    {
        var contact = await serviceContext.Contacts.FindAsync(updateContactContactDto.Id);

        bool contactCustomsTheSame = true;
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

        mapper.Map(updateContactContactDto, contact);


        var result = await serviceContext.SaveChangesAsync() > 0;

        List<DTOs.ContactDto> dto = new();
        dto.Add(new DTOs.ContactDto
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
        });


        if (result)
            return CreatedAtRoute("GetContact", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating contact" });
    }


    private async Task<List<Entities.Contact>> RetrieveContact()
    {
        return await serviceContext.Contacts
        .Include(c => c.ContactCustoms)
        .ToListAsync();
    }
}
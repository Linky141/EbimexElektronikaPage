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

    [HttpGet]
    public async Task<ActionResult<List<DTOs.ContactDto>>> GetContact()
    {
        var contact = await RetrieveContact();
        if (contact == null)
            return NotFound();
        var contactDto = contact.Select(c => mapper.Map<DTOs.ContactDto>(c)).ToList();
        return Ok(contactDto);
    }

    [HttpPut("UpdateAddress")]
    public async Task<ActionResult<Entities.Contact>> UpdateAddress([FromForm] DTOs.UpdateContactDto updateContactDto)
    {
        var contact = await serviceContext.Contacts.FindAsync(updateContactDto.Id);

        if (updateContactDto.AddressCity == contact.AddressCity &&
        updateContactDto.AddressCountry == contact.AddressCountry &&
        updateContactDto.AddressNumber1 == contact.AddressNumber1 &&
        updateContactDto.AddressNumber2 == contact.AddressNumber2 &&
        updateContactDto.AddressPostal == contact.AddressPostal &&
        updateContactDto.AddressStreet == contact.AddressStreet &&
        updateContactDto.Email == contact.Email &&
        updateContactDto.Phone == contact.Phone
        )
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });

        if (contact == null)
            return NotFound();

        mapper.Map(updateContactDto, contact);

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return Ok(contact);
        return BadRequest(new ProblemDetails { Title = "Problem updating address" });
    }


    private async Task<List<Entities.Contact>> RetrieveContact()
    {
        return await serviceContext.Contacts
        .Include(c => c.ContactCustoms)
        .ToListAsync();
    }
}
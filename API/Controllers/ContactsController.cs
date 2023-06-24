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

    private async Task<List<Entities.Contact>> RetrieveContact()
    {
        return await serviceContext.Contacts
        .Include(c => c.ContactCustoms)
        .ToListAsync();
    }
}
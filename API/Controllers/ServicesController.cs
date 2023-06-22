namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly ServiceContext serviceContext;
    private readonly IMapper mapper;
    public ServicesController(ServiceContext serviceContext, IMapper mapper)
    {
        this.mapper = mapper;
        this.serviceContext = serviceContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<DTOs.ServiceDto>>> GetServices()
    {
        var services = await RetrieveServices();
        if (services == null)
            return NotFound();
        var servicesDto = services.Select(service => mapper.Map<DTOs.ServiceDto>(service)).ToList();
        return Ok(servicesDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DTOs.ServiceDto>> GetService(int id)
    {
        var service = await RetrieveService(id);
        if (service == null)
            return NotFound();
        return mapper.Map<DTOs.ServiceDto>(service);
    }

    private async Task<List<Entities.Service>> RetrieveServices()
    {
        return await serviceContext.Services
        .Include(c => c.Comments)
        .Include(p => p.PictureUrls).ToListAsync();
    }

    private async Task<Entities.Service> RetrieveService(int id)
    {
        return await serviceContext.Services
        .Include(c => c.Comments)
        .Include(p => p.PictureUrls)
        .SingleOrDefaultAsync(x => x.Id == id);
    }
}
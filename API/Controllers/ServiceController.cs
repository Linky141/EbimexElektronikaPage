namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceController : ControllerBase
{
    private readonly ServiceContext serviceContext;
    public ServiceController(ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Entities.Service>>> GetServices()
    {
        var services = await serviceContext.Services.ToListAsync();
        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Entities.Service>> GetService(int id)
    {
        return await serviceContext.Services.FindAsync(id);
    }
}
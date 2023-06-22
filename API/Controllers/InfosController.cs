namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InfosController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly ServiceContext serviceContext;
    public InfosController(IMapper mapper, ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
        this.mapper = mapper;

    }

    [HttpGet]
    public async Task<ActionResult<List<DTOs.InfoDto>>> GetInfo()
    {
        var info = await RetrieveInfo();
        if (info == null)
            return NotFound();
        var infoDto = info.Select(i => mapper.Map<DTOs.InfoDto>(i)).ToList();
        return Ok(infoDto);
    }

    private async Task<List<Entities.Info>> RetrieveInfo()
    {
        return await serviceContext.Infos
        .Include(c => c.InfoAnnouncements)
        .ToListAsync();
    }
}
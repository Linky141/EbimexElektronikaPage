namespace API.Controllers;

public class HomePageController : BaseApiController
{
    private readonly IMapper mapper;
    private readonly ServiceContext serviceContext;
    public HomePageController(IMapper mapper, ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
        this.mapper = mapper;
    }

    [HttpGet(Name = "GetHomePage")]
    public async Task<ActionResult<List<DTOs.HomePageDto>>> GetHomePage()
    {
        var homepages = await RetrieveHomePages();
        if (homepages == null)
            return NotFound();
        var infoDto = homepages.Select(i => mapper.Map<DTOs.HomePageDto>(i)).ToList();
        return Ok(infoDto);
    }

    private async Task<List<Entities.HomePage>> RetrieveHomePages()
    {
        return await serviceContext.HomePages
        .Include(info => info.PictureUrls)
        .ToListAsync();
    }
}
namespace API.Controllers;

public class HomePageController : BaseApiController
{
    private readonly IMapper mapper;
    private readonly ServiceContext serviceContext;
    private readonly ApiServices.ImageService imageService;
    public HomePageController(IMapper mapper, ServiceContext serviceContext, ApiServices.ImageService imageService)
    {
        this.serviceContext = serviceContext;
        this.mapper = mapper;
        this.imageService = imageService;
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


    [Authorize(Roles = "Admin")]
    [HttpPut("UpdateHomePage")]
    public async Task<ActionResult<Entities.HomePage>> UpdataHomePage(DTOs.UpdateHomePageDto homePageDto)
    {
        var homePage = RetrieveHomePage(homePageDto.Id).Result;

        if (homePage == null)
            return NotFound();

        mapper.Map(homePageDto, homePage);

        foreach (var file in homePage.PictureUrls)
        {
            if (!string.IsNullOrEmpty(file.PublicId) && !homePageDto.Files.Contains(file.Url))
                await imageService.DeleteImageAsync(file.PublicId);
        }
        List<Entities.PictureUrlHomePage> tmpPicUrl = new();

        foreach (var file in homePageDto.Files)
        {
            if (!string.IsNullOrEmpty(file))
            {
                // bool isUrl = Uri.IsWellFormedUriString(file, UriKind.Absolute);
                bool isUrl = file.Contains("https://");

                if (isUrl)
                {
                    tmpPicUrl.Add(homePage.PictureUrls.FirstOrDefault(x => x.Url == file));
                }
                else
                {
                    var iFile = ApiServices.Base64Service.Base64ToImage(file);
                    var imageResult = await imageService.AddImageAsync(iFile);
                    if (imageResult.Error != null)
                        return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                    Entities.PictureUrlHomePage url = new Entities.PictureUrlHomePage
                    {
                        PublicId = imageResult.PublicId,
                        Url = imageResult.SecureUrl.ToString()
                    };
                    tmpPicUrl.Add(url);
                }
            }
        }
        homePage.PictureUrls = tmpPicUrl;

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtRoute("", mapper.Map<DTOs.HomePageDto>(homePage));
        return BadRequest(new ProblemDetails { Title = "Problem updating service" });
    }

    private async Task<List<Entities.HomePage>> RetrieveHomePages()
    {
        return await serviceContext.HomePages
        .Include(homepage => homepage.PictureUrls)
        .ToListAsync();
    }

    private async Task<Entities.HomePage> RetrieveHomePage(int id)
    {
        return await serviceContext.HomePages
        .Include(homepage => homepage.PictureUrls)
        .SingleOrDefaultAsync(homepage => homepage.Id == id);
    }
}
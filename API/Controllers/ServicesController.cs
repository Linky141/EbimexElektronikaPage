

namespace API.Controllers;

public class ServicesController : BaseApiController
{
    private readonly ServiceContext serviceContext;
    private readonly IMapper mapper;
    private readonly ApiServices.ImageService imageService;
    private readonly UserManager<Entities.User> userManager;
    public ServicesController(ServiceContext serviceContext, IMapper mapper, ApiServices.ImageService imageService, UserManager<Entities.User> userManager)
    {
        this.userManager = userManager;
        this.imageService = imageService;
        this.mapper = mapper;
        this.serviceContext = serviceContext;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<DTOs.ServiceDto>>> GetServices()
    {
        var services = await RetrieveServices();
        if (services == null)
            return NotFound();
        return Ok(services.Select(service => mapper.Map<DTOs.ServiceDto>(service)).ToList());
    }

    [Authorize(Roles = "Member")]
    [HttpGet("GetServices/{email}")]
    public async Task<ActionResult<List<DTOs.ServiceDto>>> GetServices(string email)
    {
        var user = await userManager.FindByEmailAsync(email);
        var roles = await userManager.GetRolesAsync(user);
        var isAdmin = roles.Contains("Admin");

        List<Entities.Service> services = null;
        if (isAdmin)
            services = await RetrieveServices();
        else
            services = await RetrieveServices(email);
        if (services == null)
            return NotFound();
        return Ok(services.Select(service => mapper.Map<DTOs.ServiceDto>(service)).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DTOs.ServiceDto>> GetService(int id)
    {
        var service = await RetrieveService(id);
        if (service == null)
            return NotFound();
        return mapper.Map<DTOs.ServiceDto>(service);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("UpdataService")]
    public async Task<ActionResult<Entities.Service>> UpdataService(DTOs.UpdateServiceDto serviceDto)
    {
        var service = RetrieveService(serviceDto.Id).Result;

        if (service == null)
            return NotFound();

        mapper.Map(serviceDto, service);

        foreach (var file in service.PictureUrls)
        {
            if (!string.IsNullOrEmpty(file.PublicId) && !serviceDto.Files.Contains(file.Url))
                await imageService.DeleteImageAsync(file.PublicId);
        }
        List<Entities.PictureUrlService> tmpPicUrl = new();

        foreach (var file in serviceDto.Files)
        {
            if (!string.IsNullOrEmpty(file))
            {
                // bool isUrl = Uri.IsWellFormedUriString(file, UriKind.Absolute);
                bool isUrl = file.Contains("https://");

                if (isUrl)
                {
                    tmpPicUrl.Add(service.PictureUrls.FirstOrDefault(x => x.Url == file));
                }
                else
                {
                    var iFile = ApiServices.Base64Service.Base64ToImage(file);
                    var imageResult = await imageService.AddImageAsync(iFile);
                    if (imageResult.Error != null)
                        return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                    Entities.PictureUrlService url = new Entities.PictureUrlService
                    {
                        PublicId = imageResult.PublicId,
                        Url = imageResult.SecureUrl.ToString()
                    };
                    tmpPicUrl.Add(url);
                }
            }
        }
        service.PictureUrls = tmpPicUrl;

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtRoute("", mapper.Map<DTOs.ServiceDto>(service));
        return BadRequest(new ProblemDetails { Title = "Problem updating service" });
    }

    [Authorize(Roles = "Member")]
    [HttpPost("AddNewComment")]
    public async Task<ActionResult<Entities.Service>> AddNewComment(DTOs.AddNewCommentDto commentsDto)
    {
        commentsDto.DateTime = commentsDto.DateTime.ToUniversalTime();
        var service = RetrieveService(commentsDto.Id).Result;

        if (service == null)
            return NotFound();

        service.Comments.Add(new Entities.Comment
        {
            DateTime = commentsDto.DateTime,
            User = commentsDto.User,
            Content = commentsDto.Content
        });

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtRoute("", mapper.Map<DTOs.ServiceDto>(service));
        return BadRequest(new ProblemDetails { Title = "Problem adding comment" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("AddNewService")]
    public async Task<ActionResult> AddNewService(DTOs.AddServiceDto serviceDto)
    {
        var service = mapper.Map<Entities.Service>(serviceDto);

        foreach (var file in serviceDto.Files)
        {
            if (!string.IsNullOrEmpty(file))
            {
                var iFile = ApiServices.Base64Service.Base64ToImage(file);
                var imageResult = await imageService.AddImageAsync(iFile);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                Entities.PictureUrlService url = new Entities.PictureUrlService
                {
                    PublicId = imageResult.PublicId,
                    Url = imageResult.SecureUrl.ToString()
                };
                service.PictureUrls.Add(url);
            }
        }

        serviceContext.Services.Add(service);
        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return StatusCode(201);
        return BadRequest(new ProblemDetails { Title = "Problem adding service" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("RemoveService_{id}")]
    public async Task<ActionResult> RemoveService(int id)
    {
        var service = RetrieveService(id).Result;
        if (service == null)
            return NotFound();

        foreach (var file in service.PictureUrls)
        {
            if (!string.IsNullOrEmpty(file.PublicId))
                await imageService.DeleteImageAsync(file.PublicId);
        }

        serviceContext.Services.Remove(service);

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return Ok();
        else
            return BadRequest(new ProblemDetails { Title = "Problem removing" });
    }

    private async Task<List<Entities.Service>> RetrieveServices(string email = null)
    {
        if (email == null)
        {
            return await serviceContext.Services
            .Include(c => c.Comments)
            .Include(p => p.PictureUrls)
            .ToListAsync();
        }
        else
        {
            return await serviceContext.Services
            .Include(c => c.Comments)
            .Include(p => p.PictureUrls)
            .Where(x => x.ClientEmail == email)
            .ToListAsync();
        }
    }

    private async Task<Entities.Service> RetrieveService(int id)
    {
        return await serviceContext.Services
        .Include(c => c.Comments)
        .Include(p => p.PictureUrls)
        .SingleOrDefaultAsync(x => x.Id == id);
    }
}
namespace API.Controllers;

public class ServicesController : BaseApiController
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

    [HttpPut("UpdataService")]
    public async Task<ActionResult<Entities.Service>> UpdataService(DTOs.UpdateServiceDto serviceDto)
    {
        var service = RetrieveService(serviceDto.Id).Result;

        if (service == null)
            return NotFound();

        if (serviceDto.Name == service.Name &&
            serviceDto.CurrentStatus == service.CurrentStatus &&
            serviceDto.Description == service.Description &&
            serviceDto.PlannedDateOfCompletion == service.PlannedDateOfCompletion &&
            serviceDto.Price == service.Price
        )
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });

        mapper.Map(serviceDto, service);

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtRoute("", mapper.Map<DTOs.ServiceDto>(service));
        return BadRequest(new ProblemDetails { Title = "Problem updating service" });
    }

    [HttpPost("AddNewComment")]
    public async Task<ActionResult<Entities.Service>> AddNewComment(DTOs.AddNewCommentDto commentsDto)
    {
        var service = RetrieveService(commentsDto.Id).Result;

        if (service == null)
            return NotFound();

        service.Comments.Add(new Entities.Comment
        {
            DateTime = commentsDto.Comment.DateTime,
            User = commentsDto.Comment.User,
            Content = commentsDto.Comment.Content
        });

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtRoute("", mapper.Map<DTOs.ServiceDto>(service));
        return BadRequest(new ProblemDetails { Title = "Problem adding comment" });
    }

    [HttpPost("AddNewService")]
    public async Task<ActionResult> AddNewService(DTOs.AddServiceDto serviceDto)
    {
        var service = mapper.Map<Entities.Service>(serviceDto);
        serviceContext.Services.Add(service);

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return StatusCode(201);
        return BadRequest(new ProblemDetails { Title = "Problem adding service" });
    }

    [HttpDelete("RemoveService_{id}")]
    public async Task<ActionResult> RemoveService(int id)
    {
        var service = RetrieveService(id).Result;
        if (service == null)
            return NotFound();

        serviceContext.Services.Remove(service);

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return Ok();
        else
            return BadRequest(new ProblemDetails { Title = "Problem removing" });
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
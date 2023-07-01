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

    [HttpPut("UpdataService")]
    public async Task<ActionResult<Entities.Service>> UpdataService(DTOs.UpdateServiceDto serviceDto)
    {
        var service = RetrieveService(serviceDto.Id).Result;

        if (serviceDto.Name == service.Name &&
            serviceDto.CurrentStatus == service.CurrentStatus &&
            serviceDto.Description == service.Description &&
            serviceDto.PlannedDateOfCompletion == service.PlannedDateOfCompletion &&
            serviceDto.Price == service.Price
        )
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });

        if (service == null)
            return NotFound();


        mapper.Map(serviceDto, service);

        var result = await serviceContext.SaveChangesAsync() > 0;

        var dto = CreateDto(service);

        if (result)
            return CreatedAtRoute("", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating service" });
    }

    [HttpPut("UpdataComments")]
    public async Task<ActionResult<Entities.Service>> UpdataComments(DTOs.UpdateCommentsDto commentsDto)
    {
        var service = RetrieveService(commentsDto.Id).Result;

        if (service == null)
            return NotFound();

        bool commentsTheSame = true;
        if (commentsDto.Comments.Count == 0 || service.Comments.Count == 0)
            commentsTheSame = false;
        foreach (var comment in commentsDto.Comments)
        {
            if (service.Comments.Any(item => comment.Id != item.Id || comment.DateTime != item.DateTime || comment.Content != item.Content))
                commentsTheSame = false;
        }

        if (commentsTheSame)
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });

        mapper.Map(commentsDto, service);

        var result = await serviceContext.SaveChangesAsync() > 0;

        var dto = CreateDto(service);

        if (result)
            return CreatedAtRoute("", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating comments" });
    }

//TODO: fix
    [HttpPost("AddNewService")]
    public async Task<ActionResult> AddNewService(DTOs.AddServiceDto serviceDto)
    {
        var services = RetrieveServices().Result;

        if (services == null || serviceDto == null)
            return NotFound();

       services.Add(mapper.Map<Entities.Service>(serviceDto));
        // mapper.Map(serviceDto, services);

        var result = await serviceContext.SaveChangesAsync() > 0;

        // var dto = CreateDto(services);

        if (result)
            //return CreatedAtRoute("", dto);
            return StatusCode(201);
        return BadRequest(new ProblemDetails { Title = "Problem adding service" });
    }

//TODO: fix
    [HttpDelete("RemoveService")]
    public async Task<ActionResult> RemoveService(int id)
    {
        var service = RetrieveService(id).Result;
        var services = RetrieveServices().Result;

        if (service == null)
            return NotFound();

       services.Remove(service);
        // mapper.Map(serviceDto, services);

        var result = await serviceContext.SaveChangesAsync() > 0;

        // var dto = CreateDto(services);

        if (result)
            //return CreatedAtRoute("", dto);
            return StatusCode(201);
        return BadRequest(new ProblemDetails { Title = "Problem removing" });
    }













    private DTOs.ServiceDto CreateDto(Entities.Service service)
    {
        return new DTOs.ServiceDto
        {
            Name = service.Name,
            Description = service.Description,
            PlannedDateOfCompletion = service.PlannedDateOfCompletion,
            Price = service.Price,
            CurrentStatus = service.CurrentStatus,
            PictureUrls = service.PictureUrls.Select(item =>
                new DTOs.PictureUrlDto() { Id = item.Id, Url = item.Url }
            ).ToList(),
            Comments = service.Comments.Select(item =>
                new DTOs.CommentDto() { Id = item.Id, User = item.User, DateTime = item.DateTime, Content = item.Content }
            ).ToList()
        };
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
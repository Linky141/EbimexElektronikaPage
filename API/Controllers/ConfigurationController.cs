namespace API.Controllers;

public class ConfigurationController : BaseApiController
{
    private readonly IMapper mapper;
    private readonly ServiceContext serviceContext;
    public ConfigurationController(IMapper mapper, ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
        this.mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<DTOs.ConfigurationDto>> GetConfiguration()
    {
        var configuration = await RetrieveConfiguration();
        if (configuration == null)
            return NotFound();
        var configurationDto = configuration.Select(i => mapper.Map<DTOs.ConfigurationDto>(i));
        return Ok(configurationDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<DTOs.ConfigurationDto>> SetConfiguration(DTOs.ConfigurationDto configDto)
    {
        var configuration = await RetrieveConfiguration(configDto.Id);
        if (configuration == null)
            return NotFound();

        mapper.Map(configDto, configuration);

        var result = await serviceContext.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtRoute("", new List<DTOs.ConfigurationDto>() { mapper.Map<DTOs.ConfigurationDto>(configuration) });
        return BadRequest(new ProblemDetails { Title = "Problem saving configuration" });
    }

    private async Task<List<Entities.Configuration>> RetrieveConfiguration()
    {
        return await serviceContext.Configurations
        .ToListAsync();
    }

    private async Task<Entities.Configuration> RetrieveConfiguration(int id)
    {
        return await serviceContext.Configurations
        .SingleOrDefaultAsync(c => c.Id == id);
    }
}
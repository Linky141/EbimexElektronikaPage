namespace API.Controllers;

public class InfosController : BaseApiController
{
    private readonly IMapper mapper;
    private readonly ServiceContext serviceContext;
    public InfosController(IMapper mapper, ServiceContext serviceContext)
    {
        this.serviceContext = serviceContext;
        this.mapper = mapper;

    }

    [HttpGet(Name = "GetInfo")]
    public async Task<ActionResult<List<DTOs.InfoDto>>> GetInfo()
    {
        var info = await RetrieveInfos();
        if (info == null)
            return NotFound();
        var infoDto = info.Select(i => mapper.Map<DTOs.InfoDto>(i)).ToList();
        return Ok(infoDto);
    }

    [HttpPut("UpdateOpenHours")]
    public async Task<ActionResult<Entities.Contact>> UpdateOpenHours(DTOs.UpdateInfoOpehHoursDto updateInfoOpehHoursDto)
    {
        var info = RetrieveInfo(updateInfoOpehHoursDto.Id).Result;

        if (updateInfoOpehHoursDto.OpeningHoursMondayStart == info.OpeningHoursMondayStart &&
            updateInfoOpehHoursDto.OpeningHoursMondayEnd == info.OpeningHoursMondayEnd &&
            updateInfoOpehHoursDto.OpeningHoursTuesdayStart == info.OpeningHoursTuesdayStart &&
            updateInfoOpehHoursDto.OpeningHoursTuesdayEnd == info.OpeningHoursTuesdayEnd &&
            updateInfoOpehHoursDto.OpeningHoursWednesdayStart == info.OpeningHoursWednesdayStart &&
            updateInfoOpehHoursDto.OpeningHoursWednesdayEnd == info.OpeningHoursWednesdayEnd &&
            updateInfoOpehHoursDto.OpeningHoursThursdayStart == info.OpeningHoursThursdayStart &&
            updateInfoOpehHoursDto.OpeningHoursThursdayEnd == info.OpeningHoursThursdayEnd &&
            updateInfoOpehHoursDto.OpeningHoursFridayStart == info.OpeningHoursFridayStart &&
            updateInfoOpehHoursDto.OpeningHoursFridayEnd == info.OpeningHoursFridayEnd &&
            updateInfoOpehHoursDto.OpeningHoursSaturdayStart == info.OpeningHoursSaturdayStart &&
            updateInfoOpehHoursDto.OpeningHoursSaturdayEnd == info.OpeningHoursSaturdayEnd &&
            updateInfoOpehHoursDto.OpeningHoursSundayStart == info.OpeningHoursSundayStart &&
            updateInfoOpehHoursDto.OpeningHoursSundayEnd == info.OpeningHoursSundayEnd 
        )
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });

        if (info == null)
            return NotFound();

        mapper.Map(updateInfoOpehHoursDto, info);

        var result = await serviceContext.SaveChangesAsync() > 0;

        var dto = CreateDto(info);

        if (result)
            return CreatedAtRoute("GetInfo", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating open hours" });
    }

    [HttpPut("UpdateAnnouncements")]
    public async Task<ActionResult<Entities.Contact>> UpdateAnnouncements(DTOs.UpdateInfoAnnouncementsDto updateInfoAnnouncementsDto)
    {
         var info = RetrieveInfo(updateInfoAnnouncementsDto.Id).Result;

        bool announcementTheSame = true;
        if (updateInfoAnnouncementsDto.InfoAnnouncements.Count == 0 || info.InfoAnnouncements.Count == 0)
            announcementTheSame = false;
        foreach (var announcement in updateInfoAnnouncementsDto.InfoAnnouncements)
        {
            if (info.InfoAnnouncements.Any(item => announcement.Id != item.Id || announcement.DateAndTime != item.DateAndTime || announcement.Content != item.Content))
                announcementTheSame = false;
        }

        if (announcementTheSame)
            return BadRequest(new ProblemDetails { Title = "Nothing changed" });


        if (info == null)
            return NotFound();

        info.InfoAnnouncements = new();
        mapper.Map(updateInfoAnnouncementsDto, info);
        info.InfoAnnouncements.ForEach(c => c.Id = 0);

        var result = await serviceContext.SaveChangesAsync() > 0;

        var dto = CreateDto(info);

        if (result)
            return CreatedAtRoute("GetInfo", dto);
        return BadRequest(new ProblemDetails { Title = "Problem updating announcements" });
    }

    private List<DTOs.InfoDto> CreateDto(Entities.Info info)
    {
        return new List<DTOs.InfoDto>{
        new DTOs.InfoDto
        {
            OpeningHoursMondayStart = info.OpeningHoursMondayStart,
            OpeningHoursMondayEnd = info.OpeningHoursMondayEnd,
            OpeningHoursTuesdayStart = info.OpeningHoursTuesdayStart,
            OpeningHoursTuesdayEnd = info.OpeningHoursTuesdayEnd,
            OpeningHoursWednesdayStart = info.OpeningHoursWednesdayStart,
            OpeningHoursWednesdayEnd = info.OpeningHoursWednesdayEnd,
            OpeningHoursThursdayStart = info.OpeningHoursThursdayStart,
            OpeningHoursThursdayEnd = info.OpeningHoursThursdayEnd,
            OpeningHoursFridayStart = info.OpeningHoursFridayStart,
            OpeningHoursFridayEnd = info.OpeningHoursFridayEnd,
            OpeningHoursSaturdayStart = info.OpeningHoursSaturdayStart,
            OpeningHoursSaturdayEnd = info.OpeningHoursSaturdayEnd,
            OpeningHoursSundayStart = info.OpeningHoursSundayStart,
            OpeningHoursSundayEnd = info.OpeningHoursSundayEnd,
            InfoAnnouncements =  info.InfoAnnouncements.Select(item =>
            new DTOs.InfoAnnouncementDto() { Id = item.Id, DateAndTime = item.DateAndTime, Content = item.Content }
           ).ToList()
        }};
    }

    private async Task<List<Entities.Info>> RetrieveInfos()
    {
        return await serviceContext.Infos
        .Include(info => info.InfoAnnouncements)
        .ToListAsync();
    }

    private async Task<Entities.Info> RetrieveInfo(int id)
    {
        return await serviceContext.Infos
        .Include(info => info.InfoAnnouncements)
        .SingleOrDefaultAsync(info => info.Id == id);
    }
}
namespace API.RequestHelpers;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Entities.Service, DTOs.ServiceDto>();
        CreateMap<Entities.PictureUrl, DTOs.PictureUrlDto>();
        CreateMap<Entities.Comment, DTOs.CommentDto>();

        CreateMap<Entities.Contact, DTOs.ContactDto>();
        CreateMap<Entities.ContactCustom, DTOs.ContactCustomDto>();
        CreateMap<DTOs.UpdateContactDto, Entities.Contact>();

        CreateMap<Entities.Info, DTOs.InfoDto>();
        CreateMap<Entities.InfoAnnouncement, DTOs.InfoAnnouncementDto>();
    }
}
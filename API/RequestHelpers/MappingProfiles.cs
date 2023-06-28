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
        CreateMap<DTOs.UpdateContactAddressDto, Entities.Contact>();
        CreateMap<DTOs.UpdateContactContactDto, Entities.Contact>();
        CreateMap<DTOs.ContactCustomDto, Entities.ContactCustom>();

        CreateMap<Entities.Info, DTOs.InfoDto>();
        CreateMap<Entities.InfoAnnouncement, DTOs.InfoAnnouncementDto>();
    }
}
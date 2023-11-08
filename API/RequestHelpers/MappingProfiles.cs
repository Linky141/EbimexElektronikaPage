namespace API.RequestHelpers;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Entities.Service, DTOs.ServiceDto>();
        CreateMap<DTOs.UpdateServiceDto, Entities.Service>();
        CreateMap<DTOs.AddNewCommentDto, Entities.Service>();
        CreateMap<DTOs.AddServiceDto, Entities.Service>();
        CreateMap<Entities.PictureUrlService, DTOs.PictureUrlDto>();
        CreateMap<DTOs.PictureUrlDto, Entities.PictureUrlService>();
        CreateMap<Entities.Comment, DTOs.CommentDto>();
        CreateMap<DTOs.CommentDto, Entities.Comment>();
        CreateMap<Entities.HomePage, DTOs.HomePageDto>();
        CreateMap<Entities.PictureUrlHomePage, DTOs.PictureUrlDto>();
        CreateMap<DTOs.UpdateHomePageDto, Entities.HomePage>();

        CreateMap<Entities.Contact, DTOs.ContactDto>();
        CreateMap<Entities.ContactCustom, DTOs.ContactCustomDto>();
        CreateMap<DTOs.UpdateContactAddressDto, Entities.Contact>();
        CreateMap<DTOs.UpdateContactContactDto, Entities.Contact>();
        CreateMap<DTOs.ContactCustomDto, Entities.ContactCustom>();


        CreateMap<Entities.Info, DTOs.InfoDto>();
        CreateMap<Entities.InfoAnnouncement, DTOs.InfoAnnouncementDto>();
        CreateMap<DTOs.UpdateInfoOpehHoursDto, Entities.Info>();
        CreateMap<DTOs.UpdateInfoAnnouncementsDto, Entities.Info>();
        CreateMap<DTOs.InfoAnnouncementDto, Entities.InfoAnnouncement>();

        CreateMap<DTOs.ConfigurationDto, Entities.Configuration>();
        CreateMap<Entities.Configuration, DTOs.ConfigurationDto>();
    }
}
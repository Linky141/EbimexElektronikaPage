namespace API.RequestHelpers;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Entities.Service, DTOs.ServiceDto>();
        CreateMap<Entities.PictureUrl, DTOs.PictureUrlDto>();
        CreateMap<Entities.Comment, DTOs.CommentDto>();
    }
}
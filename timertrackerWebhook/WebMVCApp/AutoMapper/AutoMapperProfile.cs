using AutoMapper;
using WebMVCApp.DTO;
using WebMVCApp.Entities;

namespace WebMVCApp.AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {

        CreateMap<TimeTracking, TimeTrackingDto>();
            // .ForMember(
            //     dest => dest.ClientId,
            //     opt => opt.MapFrom(src => src.Client.Id)
            // ).ForMember(
            //     dest => dest.UserId,
            //     opt => opt.MapFrom(src => src.User.Id));
        
        CreateMap<TimeTrackingDto, TimeTracking>();
    }
    
}
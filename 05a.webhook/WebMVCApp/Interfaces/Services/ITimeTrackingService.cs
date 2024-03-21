using WebMVCApp.DTO;
using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Services;

public interface ITimeTrackingService
{
    Task<TimeTracking> AddAsync(TimeTrackingDto timeTrackingDto);
    Task<IEnumerable<TimeTrackingDto>> GetAllAsync();
    Task<IEnumerable<TimeTrackingDto>> GetAllByUserIdAsync(int userId);
    Task<TimeTracking> GetById(int id);
    Task<TimeTracking> Update(int id, TimeTrackingDto timeTrackingDto);
    Task<bool> Delete(int id);


}
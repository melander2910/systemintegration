using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Repositories;

public interface ITimeTrackingRepository
{
    
    Task<TimeTracking> AddAsync(TimeTracking timeTracking);
    Task<IEnumerable<TimeTracking>> GetAllAsync();
    Task<IEnumerable<TimeTracking>> GetAllByUserIdAsync(int userId);
    Task<TimeTracking> FindAsync(int id);
    Task<TimeTracking> Update(int id, TimeTracking timeTracking);
    Task<bool> Delete(int id);
}
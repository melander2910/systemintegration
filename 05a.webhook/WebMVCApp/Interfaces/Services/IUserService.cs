using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Services;

public interface IUserService
{
    Task<User> AddAsync(User user);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> FindAsync(int id);
}
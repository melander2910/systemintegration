using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User> AddAsync(User user);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> FindAsync(int id);

}
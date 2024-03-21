using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Services;

public interface IClientService
{
    Task<Client> AddAsync(Client client);
    Task<IEnumerable<Client>> GetAllAsync();
    Task<Client> FindAsync(int id);
    Task<IEnumerable<Client>> GetAllByUserIdAsync(int id);
}
using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Repositories;

public interface IClientRepository
{
    Task<Client> AddAsync(Client client);
    Task<IEnumerable<Client>> GetAllAsync();
    Task<Client> FindAsync(int id);
    Task<IEnumerable<Client>> GetAllByUserIdAsync(int id);


}
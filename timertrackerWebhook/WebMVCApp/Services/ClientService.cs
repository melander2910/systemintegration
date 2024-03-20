using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _clientRepository;
    
    public ClientService(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task<Client> AddAsync(Client client)
    {
        return await _clientRepository.AddAsync(client);
    }

    public async Task<IEnumerable<Client>> GetAllAsync()
    {
        return await _clientRepository.GetAllAsync();
    }

    public async Task<Client> FindAsync(int id)
    {
        return await _clientRepository.FindAsync(id);
    }

    public async Task<IEnumerable<Client>> GetAllByUserIdAsync(int id)
    {
        return await _clientRepository.GetAllByUserIdAsync(id);
    }
}
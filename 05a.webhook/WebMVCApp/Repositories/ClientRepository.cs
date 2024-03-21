using Microsoft.EntityFrameworkCore;
using WebMVCApp.Data;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;

namespace WebMVCApp.Repositories;

public class ClientRepository : IClientRepository
{ 
    private readonly DataContext _context;
    
    public ClientRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Client> AddAsync(Client client)
    {
         await _context.Clients.AddAsync(client);
         await _context.SaveChangesAsync();
         return client;
    }

    public async Task<IEnumerable<Client>> GetAllAsync()
    {
        return await _context.Clients.ToListAsync();
    }

    public async Task<Client> FindAsync(int id)
    {
        return await _context.Clients.FindAsync(id);
    }

    public async Task<IEnumerable<Client>> GetAllByUserIdAsync(int id)
    {
        return await _context.Clients.Where(x => x.Users.Any(x => x.Id == id)).ToListAsync();
        // return result.Where(x => x.Categories.Any(c => c.category == categoryId));

    }
}
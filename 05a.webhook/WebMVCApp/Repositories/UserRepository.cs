using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using WebMVCApp.Data;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;

namespace WebMVCApp.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    
    public UserRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<User> AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> FindAsync(int id)
    {
        var user = await _context.Users.AsNoTracking()
            .Include(x => x.TimeTrackings)
            .Include(x => x.Clients)
            .FirstOrDefaultAsync(x => x.Id == id);
        return user;
    }
}
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebMVCApp.Data;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;
using YamlDotNet.Core;

namespace WebMVCApp.Repositories;

public class TimeTrackingRepository : ITimeTrackingRepository
{
    private readonly DataContext _context;
    
    public TimeTrackingRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<TimeTracking> AddAsync(TimeTracking timeTracking)
    {
        await _context.TimeTrackings.AddAsync(timeTracking);
        await _context.SaveChangesAsync();
        return timeTracking;
    }

    public async Task<IEnumerable<TimeTracking>> GetAllAsync()
    {
        return await _context.TimeTrackings.ToListAsync();
    }

    public async Task<IEnumerable<TimeTracking>> GetAllByUserIdAsync(int userId)
    {
        return await _context.TimeTrackings
            .Where(x => x.User.Id == userId)
            .ToListAsync();
    }

    public async Task<TimeTracking> FindAsync(int id)
    {
        return await _context.TimeTrackings.FindAsync(id);
    }

    public async Task<TimeTracking> Update(int id, TimeTracking timeTracking)
    {
        _context.TimeTrackings.Update(timeTracking);
        await _context.SaveChangesAsync();
        return timeTracking;
    }

    // return type bool? true for successfull delete?
    // 
    public async Task<bool> Delete(int id)
    {
        var timeTracking = await _context.TimeTrackings.FindAsync(id);
        if (timeTracking == null)
        {
            throw new ArgumentNullException(nameof(timeTracking));
        }

        _context.TimeTrackings.Remove(timeTracking);
        await _context.SaveChangesAsync();
        return true;
    }
}
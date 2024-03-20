using Microsoft.EntityFrameworkCore;
using WebMVCApp.Data;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;

namespace WebMVCApp.Repositories;

public class WebhookRepository : IWebhookRepository
{
    private readonly DataContext _context;

    public WebhookRepository(DataContext context)
    {
        _context = context;
    }
    public async Task<WebhookRegistration> RegisterWebhookAsync(WebhookRegistration webhookRegistration)
    {
        await _context.WebhookRegistrations.AddAsync(webhookRegistration);
        await _context.SaveChangesAsync();
        return webhookRegistration;
    }

    public async Task<WebhookRegistration> UnRegisterWebhookAsync(WebhookRegistration webhookRegistration)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<WebhookRegistration>> GetWebhookRegistrationsByEventTypeAsync(string eventType)
    {
        return await _context.WebhookRegistrations.ToListAsync();
    }

    public async Task<IEnumerable<WebhookRegistration>> GetAllAsync()
    {
        return await _context.WebhookRegistrations.ToListAsync();
    }
}
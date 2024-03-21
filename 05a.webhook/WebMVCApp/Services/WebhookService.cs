using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Services;

public class WebhookService : IWebhookService
{
    private readonly IWebhookRepository _webhookRepository;
    public WebhookService(IWebhookRepository webhookRepository)
    {
        _webhookRepository = webhookRepository;
    }
    public async Task<WebhookRegistration> RegisterWebhookAsync(WebhookRegistration webhookRegistration)
    {
        return await _webhookRepository.RegisterWebhookAsync(webhookRegistration);
    }

    public async Task<WebhookRegistration> UnRegisterWebhookAsync(WebhookRegistration webhookRegistration)
    {
        return await _webhookRepository.UnRegisterWebhookAsync(webhookRegistration);
    }

    public async Task<IEnumerable<WebhookRegistration>> GetWebhookRegistrationsByEventTypeAsync(string eventType)
    {
        return await _webhookRepository.GetWebhookRegistrationsByEventTypeAsync(eventType);
    }

    public async Task<IEnumerable<WebhookRegistration>> GetAllAsync()
    {
        return await _webhookRepository.GetAllAsync();
    }
}
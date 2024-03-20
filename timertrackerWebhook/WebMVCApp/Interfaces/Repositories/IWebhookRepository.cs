using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Repositories;

public interface IWebhookRepository
{
    Task<WebhookRegistration> RegisterWebhookAsync(WebhookRegistration webhookRegistration);
    Task<WebhookRegistration> UnRegisterWebhookAsync(WebhookRegistration webhookRegistration);
    Task<IEnumerable<WebhookRegistration>> GetWebhookRegistrationsByEventTypeAsync(string eventType);
    Task<IEnumerable<WebhookRegistration>> GetAllAsync();
}
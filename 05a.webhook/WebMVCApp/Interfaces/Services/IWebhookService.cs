using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Services;

public interface IWebhookService
{
    Task<WebhookRegistration> RegisterWebhookAsync(WebhookRegistration webhookRegistration);
    Task<WebhookRegistration> UnRegisterWebhookAsync(WebhookRegistration webhookRegistration);
    Task<IEnumerable<WebhookRegistration>> GetWebhookRegistrationsByEventTypeAsync(string eventType);
    Task<IEnumerable<WebhookRegistration>> GetAllAsync();

}
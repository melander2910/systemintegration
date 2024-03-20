using WebMVCApp.DTO;
using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Services;

public interface IWebhookEventService
{
    Task TimeTrackingOnWeekend(TimeTrackingDto timeTrackingDto);

}
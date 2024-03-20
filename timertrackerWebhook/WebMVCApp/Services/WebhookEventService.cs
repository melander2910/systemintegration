using System.Text;
using Newtonsoft.Json;
using WebMVCApp.DTO;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Services;

public class WebhookEventService : IWebhookEventService
{
    private readonly IWebhookService _webhookService;
    private readonly IUserService _userService;
    private readonly IClientService _clientService;
    public WebhookEventService(IWebhookService webhookService, IUserService userService, IClientService clientService)
    {
        _webhookService = webhookService;
        _userService = userService;
        _clientService = clientService;
    }
    public async Task TimeTrackingOnWeekend(TimeTrackingDto timeTrackingDto)
    {
        // can there be multiple hooks to the same Webhook event, if webhook events are somehow client/organization based?
        var onWeekendHooks = await _webhookService.GetWebhookRegistrationsByEventTypeAsync("Timetracking.OnWeekend");
        var user = await _userService.FindAsync(timeTrackingDto.UserId);
        var client = await _clientService.FindAsync(timeTrackingDto.ClientId);
        
        foreach (var hook in onWeekendHooks)
        {
            Uri uriResult;
            bool urlIsValid = Uri.TryCreate(hook.Url, UriKind.Absolute, out uriResult) 
                          && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            if (urlIsValid )
            {
                var timetrackingOnWeekendDto = new TimetrackingOnWeekendDto(timeTrackingDto, user, client);
                using (var httpClient = new HttpClient())
                {
                    var content = new StringContent(JsonConvert.SerializeObject(timetrackingOnWeekendDto), Encoding.UTF8, hook.ContentType);
                    var response = await httpClient.PostAsync(hook.Url, content);
                
                    if (!response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Error sending POST request to {hook.Url}: {response.StatusCode}");
                    }
                    else
                    {
                        Console.WriteLine($"success sending post request to {hook.Url}: {response.StatusCode}");
                    }
                }
                
            }
        }
    }
}
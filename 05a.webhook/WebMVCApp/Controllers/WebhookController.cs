using Microsoft.AspNetCore.Mvc;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WebhookController : ControllerBase
{
    private readonly IWebhookService _webhookService;

    public WebhookController(IWebhookService webhookService)
    {
        _webhookService = webhookService;
    }

    [HttpPost(Name = "RegisterWebhook")]
    public async Task<IActionResult> RegisterWebhook([FromBody] WebhookRegistration webhookRegistration)
    {
        await _webhookService.RegisterWebhookAsync(webhookRegistration);
        return Ok("Webhook registered successully");
    }

    [HttpGet(Name = "Ping")]
    public async Task<IActionResult> Ping()
    {
        var registeredWebhooks = await _webhookService.GetAllAsync();
        return Ok(registeredWebhooks);
    }
}
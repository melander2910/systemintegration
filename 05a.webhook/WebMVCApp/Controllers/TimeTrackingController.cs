using Microsoft.AspNetCore.Mvc;
using WebMVCApp.DTO;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TimeTrackingController : ControllerBase
{
    private readonly ITimeTrackingService _timeTrackingService;
    private readonly IWebhookEventService _webhookEventService;

    public TimeTrackingController(ITimeTrackingService timeTrackingService, IWebhookEventService webhookEventService)
    {
        _timeTrackingService = timeTrackingService;
        _webhookEventService = webhookEventService;
    }
    
    [HttpGet("{id}", Name = "GetTimeTrackingsById")]
    public async Task<ActionResult<IEnumerable<TimeTrackingDto>>> GetById(int id)
    {
        var timeTracking = await _timeTrackingService.GetById(id);
        return Ok(timeTracking);
    }

    [HttpGet(Name = "GetAllTimeTrackings")]
    public async Task<ActionResult<IEnumerable<TimeTrackingDto>>> GetAll()
    {
        var timeTrackings = await _timeTrackingService.GetAllAsync();
        return Ok(timeTrackings);
    }

    [HttpPut("{id}", Name = "UpdateTimeTracking")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] TimeTrackingDto timeTracking)
    {
        // TODO: What is best practice regarding id from route?
        if (id != timeTracking.Id)
        {
            return BadRequest();
        }
        
        var updatedTimeTracking = await _timeTrackingService.Update(id, timeTracking);
        return Ok(updatedTimeTracking);
    }
    
    [HttpDelete("{id}", Name = "DeleteTimeTracking")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        // TODO: implement proper error handling
        try
        {
            var entityDeleted = await _timeTrackingService.Delete(id);
            return Ok(entityDeleted);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error creating TimeTracking: {ex.Message}");
        }
        
    }
    
    [HttpPost(Name = "AddTimeTracking")]
    public async Task<IActionResult> Add([FromBody] TimeTrackingDto timeTracking)
    {
        // TODO: implement proper error handling
        try
        {
            await _timeTrackingService.AddAsync(timeTracking);
            // webhook event - if timetracking is being made on weekends.
            if (timeTracking.StartDate.DayOfWeek == DayOfWeek.Saturday || timeTracking.StartDate.DayOfWeek == DayOfWeek.Sunday)
            {
                await _webhookEventService.TimeTrackingOnWeekend(timeTracking);
            }

            return Ok("TimeTracking created successfully");
        }
        catch (Exception ex)
        {
            // Handle any exceptions appropriately
            return BadRequest($"Error creating TimeTracking: {ex.Message}");
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITimeTrackingService _timeTrackingService;
    private readonly IClientService _clientService;

    public UserController(IUserService userService, ITimeTrackingService timeTrackingService, IClientService clientService)
    {
        _userService = userService;
        _timeTrackingService = timeTrackingService;
        _clientService = clientService;
    }
    
    
    [HttpGet("{id}", Name = "GetUserById")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<User>>> GetById([FromRoute] int id)
    {
        var user = await _userService.FindAsync(id);
        return Ok(user);
    }
    
    [HttpGet(Name = "GetAllUsers")]
    public async Task<ActionResult<IEnumerable<User>>> GetAll()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }
    
    [HttpGet]
    [Route("{id}/timetrackings", Name = "GetTimeTrackingsByUserId")]
    public async Task<ActionResult<IEnumerable<TimeTracking>>> GetTimeTrackingsByUserId(int id)
    {
        var userTimeTrackings = await _timeTrackingService.GetAllByUserIdAsync(id);
        return Ok(userTimeTrackings);
    }
    
    [HttpGet]
    [Route("{id}/clients", Name = "GetClientsByUserId")]
    public async Task<ActionResult<IEnumerable<Client>>> GetClientsByUserId(int id)
    {
        var clients = await _clientService.GetAllByUserIdAsync(id);
        return Ok(clients);
    }
    
    [HttpPost(Name = "AddUser")]
    public async Task<IActionResult> Add([FromBody] User user)
    {
        var addedUser = await _userService.AddAsync(user);
        return Ok(addedUser);
    }
    
}
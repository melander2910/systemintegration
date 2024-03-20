using Microsoft.AspNetCore.Mvc;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;
    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }
    
    [HttpGet(Name = "GetAllClients")]
    public async Task<ActionResult<IEnumerable<Client>>> GetAll()
    {
        var clients = await _clientService.GetAllAsync();
        return Ok(clients);
    }

    [HttpPost("AddMultiple")]
    public async Task<IActionResult> AddClients([FromBody] List<Client> clients)
    {
        var addedClients = new List<Client>();
        foreach (var client in clients)
        {
            var addedClient = await _clientService.AddAsync(client);
            addedClients.Add(addedClient);
        }
        
        return Ok(addedClients);
    }
    
    [HttpPost("AddSingle")]
    public async Task<IActionResult> AddClient([FromBody] Client client)
    {
        var addedClient = await _clientService.AddAsync(client);
        return Ok(addedClient);
    }
}
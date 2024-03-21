using System.IO.Pipelines;
using Microsoft.AspNetCore.Mvc;

namespace SSE.API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SSEController : ControllerBase
{
   [HttpGet(Name = "stuff")]
   public async Task GetStuff()
   {
       Console.WriteLine("stuff");
        var response = Response;
        response.Headers.Add("Cache-Control", "no-cache");
        response.Headers.Add("Connection", "keep-alive");
        response.Headers.Add("Content-Type", "text/event-stream");

        for (int i = 1; i <= 10; i++)
        {
            Console.WriteLine(i);

            await response.WriteAsync($"Bib bib: {i}");
            await response.Body.FlushAsync();
            await Task.Delay(1000);
        }
   }
    
}

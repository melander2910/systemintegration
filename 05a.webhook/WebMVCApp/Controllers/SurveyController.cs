using Microsoft.AspNetCore.Mvc;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;

namespace WebMVCApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SurveyController : ControllerBase
{
    private readonly ISurveyRepository _surveyRepository;
    
    public SurveyController(ISurveyRepository surveyRepository)
    {
        _surveyRepository = surveyRepository;
    }
    
    [HttpGet]
    public async Task<ActionResult<SurveyReporting>> GetSurveys()
    {
        var surveyReporting = await _surveyRepository.GetAll();
        return Ok(surveyReporting);
    }
}
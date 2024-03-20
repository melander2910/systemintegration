using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Repositories;

public interface ISurveyRepository
{
    Task<SurveyReporting> GetAll();
}
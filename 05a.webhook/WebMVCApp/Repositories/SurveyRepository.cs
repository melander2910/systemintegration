using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;

namespace WebMVCApp.Repositories;

public class SurveyRepository : ISurveyRepository
{
    private readonly IHttpClientFactory _httpClientFactory;
    public SurveyRepository(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory= httpClientFactory;
    }
    
    public async Task<SurveyReporting> GetAll()
    {
            var httpRequestMessage = new HttpRequestMessage(
                HttpMethod.Get,
                "https://us21.api.mailchimp.com/3.0/reporting/surveys")
            {
                Headers =
                {
                    { HeaderNames.Authorization, "apikey d82bf3e6fd26ccd5e2571998a1613e7d-us21" }
                }
            };

            var httpClient = _httpClientFactory.CreateClient();
            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                // Read the content as a string
                var jsonContent = await httpResponseMessage.Content.ReadAsStringAsync();
                // Deserialize the JSON string to SurveyReporting
                var surveyReporting = JsonConvert.DeserializeObject<SurveyReporting>(jsonContent);
                return surveyReporting;
            }
            
            return null;
    }
}
using Newtonsoft.Json;

namespace WebMVCApp.Entities;

public class SurveyReporting
{
    public SurveyReporting()
    {
        
    }
    
    [JsonProperty(PropertyName = "surveys")]
    public List<Survey> Surveys { get; set; }
    [JsonProperty(PropertyName = "total_items")]
    public int TotalItems { get; set; }
}
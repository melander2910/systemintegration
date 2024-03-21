using Newtonsoft.Json;

namespace WebMVCApp.Entities;

public class Survey
{
    public Survey()
    {
        
    }
    
    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }
    [JsonProperty(PropertyName = "web_id")]
    public int WebId { get; set; }
    [JsonProperty(PropertyName = "list_id")]
    public string ListId { get; set; }
    [JsonProperty(PropertyName = "list_name")]
    public string ListName { get; set; }
    [JsonProperty(PropertyName = "title")]
    public string Title { get; set; }
    [JsonProperty(PropertyName = "url")]
    public string Url { get; set; }
    [JsonProperty(PropertyName = "status")]
    public string Status { get; set; }
    [JsonProperty(PropertyName = "published_at")]
    public string PublishedAt { get; set; }
    [JsonProperty(PropertyName = "created_at")]
    public string CreatedAt { get; set; }
    [JsonProperty(PropertyName = "updated_at")]
    public string UpdatedAt { get; set; }
    [JsonProperty(PropertyName = "total_responses")]
    public int TotalResponses { get; set; }
}
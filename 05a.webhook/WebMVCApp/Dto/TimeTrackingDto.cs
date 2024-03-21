using Newtonsoft.Json;

namespace WebMVCApp.DTO;

public class TimeTrackingDto
{
    public int Id { get; set; }
    // [JsonProperty(PropertyName = "start")]
    public DateTime StartDate { get; set; }
    // [JsonProperty(PropertyName = "end")]
    public DateTime EndDate { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int UserId { get; set; }
    public int ClientId { get; set; }
}
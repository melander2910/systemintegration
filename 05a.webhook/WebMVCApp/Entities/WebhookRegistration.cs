namespace WebMVCApp.Entities;

public class WebhookRegistration
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string ContentType { get; set; }
    public string Secret { get; set; }
    public string EventType { get; set; }
}
namespace WebMVCApp.Entities;

public class User
{
    public int Id { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public string? Email { get; set; }
    public ICollection<Client>? Clients { get; set; }
    public ICollection<TimeTracking>? TimeTrackings { get; set; }
}
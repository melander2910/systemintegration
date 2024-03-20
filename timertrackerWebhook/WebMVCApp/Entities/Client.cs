namespace WebMVCApp.Entities;

public class Client
{
    public int Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string CompanyName { get; set; }
    public ICollection<User>? Users { get; set; }
    public ICollection<TimeTracking>? TimeTrackings { get; set; }
}
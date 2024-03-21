using WebMVCApp.Entities;

namespace WebMVCApp.DTO;

public class TimetrackingOnWeekendDto
{
    public TimetrackingOnWeekendDto(TimeTrackingDto timetracking, User user, Client client)
    {
        WebhookEventName = "Timetracking.OnWeekend";
        UserFirstname = user.Firstname;
        UserLastname = user.Lastname;
        UserEmail = user.Email;
        TimetrackingStartDate = timetracking.StartDate;
        TimetrackingEndDate = timetracking.EndDate;
        TimetrackingTitle = timetracking.Title;
        TimetrackingDescription = timetracking.Description;
        ClientFirstname = client.Firstname;
        ClientLastname = client.Lastname;
        ClientPhoneNumber = client.PhoneNumber;
        ClientEmail = client.Email;
        ClientCompanyName = client.CompanyName;
    }
    
    public string? WebhookEventName { get; set; }
    public string? UserFirstname { get; set; }
    public string? UserLastname { get; set; }
    public string? UserEmail { get; set; }
    public DateTime TimetrackingStartDate { get; set; }
    public DateTime TimetrackingEndDate { get; set; }
    public string? TimetrackingTitle { get; set; }
    public string? TimetrackingDescription { get; set; }
    public string ClientFirstname { get; set; }
    public string ClientLastname { get; set; }
    public string ClientPhoneNumber { get; set; }
    public string ClientEmail { get; set; }
    public string ClientCompanyName { get; set; }
   
   
}
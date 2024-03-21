using Microsoft.AspNetCore.Identity;

namespace WebMVCApp.Entities;

public class ExtendedIdentityUser : IdentityUser
{
    // Custom properties needed?
    public string Name { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiry { get; set; }
}
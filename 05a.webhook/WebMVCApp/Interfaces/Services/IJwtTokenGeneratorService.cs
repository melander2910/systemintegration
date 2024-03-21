using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Services;

public interface IJwtTokenGeneratorService
{
    string GenerateToken(ExtendedIdentityUser extendedIdentityUser, IEnumerable<string> roles);
    string GenerateRefreshToken();
}
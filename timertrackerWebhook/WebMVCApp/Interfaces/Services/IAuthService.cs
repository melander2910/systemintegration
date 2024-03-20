using WebMVCApp.Dto;

namespace WebMVCApp.Interfaces.Services;

public interface IAuthService
{
    Task<string> Register(RegistrationRequestDto registrationRequestDto);
    Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
    Task<bool> AssignRole(string email, string roleName);
    Task<LoginResponseDto> RefreshToken(RefreshTokenDto refreshTokenDto);
}
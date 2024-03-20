using WebMVCApp.Dto;
using WebMVCApp.Entities;

namespace WebMVCApp.Interfaces.Repositories;

public interface IAuthRepository
{
    Task<string> Register(ExtendedIdentityUser extendedIdentityUser, string password);
    Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
    Task<bool> AssignRole(string email, string roleName);
    Task<LoginResponseDto> RefreshToken(RefreshTokenDto refreshTokenDto);

}
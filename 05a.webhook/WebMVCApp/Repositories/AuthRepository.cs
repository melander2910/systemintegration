using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using WebMVCApp.Data;
using WebMVCApp.Dto;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;
using WebMVCApp.Interfaces.Services;
using WebMVCApp.Utils;

namespace WebMVCApp.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ExtendedIdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IJwtTokenGeneratorService _jwtTokenGeneratorService;
    private readonly IConfiguration _config;

    public AuthRepository(ApplicationDbContext dbContext, UserManager<ExtendedIdentityUser> userManager, 
        RoleManager<IdentityRole> roleManager, IJwtTokenGeneratorService jwtTokenGeneratorService, IConfiguration config)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _roleManager = roleManager;
        _jwtTokenGeneratorService = jwtTokenGeneratorService;
        _config = config;
    }
    public async Task<string> Register(ExtendedIdentityUser extendedIdentityUser, string password)
    {
        try
        {
            var result = await  _userManager.CreateAsync(extendedIdentityUser, password);
            if (result.Succeeded)
            {
                // email Normalized? ToLower/ToUpper?
                var userToReturn = _dbContext.ApplicationUsers.First(u => u.UserName == extendedIdentityUser.Email);
                // return created user?
                return "User successfully created";
            }
            return result.Errors.FirstOrDefault().Description;
        }
        catch (Exception ex)
        {
            return "Error: ";
        }
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
    {
        // TODO: should identityUser be found in ApplicationUsers(extendedIdentityUsers) or UserManager<ExtendedIdentityUser>
        var identityUser = _dbContext.ApplicationUsers.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDto.Username.ToLower());

        bool isValid = await _userManager.CheckPasswordAsync(identityUser, loginRequestDto.Password);

        if(identityUser == null || isValid == false)
        {
            return new LoginResponseDto() { User = null, JwtToken = "", IsLoggedIn = false};
        }

        // if user was found, Generate JWT Token
        var roles = await _userManager.GetRolesAsync(identityUser);
        var token = _jwtTokenGeneratorService.GenerateToken(identityUser, roles);
        var refreshToken = _jwtTokenGeneratorService.GenerateRefreshToken();

        identityUser.RefreshToken = refreshToken;
        identityUser.RefreshTokenExpiry = DateTime.Now.AddHours(12);
        await _userManager.UpdateAsync(identityUser);

        
        UserDto userDTO = new()
        {
            Email = identityUser.Email,
            Id = identityUser.Id,
            Name = identityUser.Name,
            PhoneNumber = identityUser.PhoneNumber
        };

        LoginResponseDto loginResponseDto = new LoginResponseDto()
        {
            User = userDTO,
            JwtToken = token,
            IsLoggedIn = true,
            RefreshToken = refreshToken
        };

        return loginResponseDto;
    }

    public async Task<bool> AssignRole(string email, string roleName)
    {
        if (!Enum.IsDefined(typeof(Enums.AuthorizationRoles), roleName))
        {
            return false;
        }

        var user = _dbContext.ApplicationUsers.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        if (user != null)
        {
            
            if (!_roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
            {
                // create role if it does not exist
                _roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
            }
            await _userManager.AddToRoleAsync(user, roleName);
            return true;
        }

        return false;
    }

    public async Task<LoginResponseDto> RefreshToken(RefreshTokenDto model)
    {
        var principal = GetTokenPrincipal(model.JwtToken);
        
        if (principal?.Identity?.Name is null)
        {
            return new LoginResponseDto();;
        }

        var identityUser = await _userManager.FindByNameAsync(principal.Identity.Name);
        if (identityUser is null || identityUser.RefreshToken != model.RefreshToken ||
            identityUser.RefreshTokenExpiry < DateTime.Now)
        {
            return new LoginResponseDto();;
        }

        var roles = await _userManager.GetRolesAsync(identityUser);
        var token = _jwtTokenGeneratorService.GenerateToken(identityUser, roles);
        var refreshToken = _jwtTokenGeneratorService.GenerateRefreshToken();

        identityUser.RefreshToken = refreshToken;
        identityUser.RefreshTokenExpiry = DateTime.Now.AddHours(12);
        await _userManager.UpdateAsync(identityUser);
        
        UserDto userDTO = new()
        {
            Email = identityUser.Email,
            Id = identityUser.Id,
            Name = identityUser.Name,
            PhoneNumber = identityUser.PhoneNumber
        };

        LoginResponseDto loginResponseDto = new LoginResponseDto()
        {
            User = userDTO,
            JwtToken = token,
            IsLoggedIn = true,
            RefreshToken = refreshToken
        };

        return loginResponseDto;
    }

    private ClaimsPrincipal? GetTokenPrincipal(string jwtToken)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
            (_config.GetSection("ApiSettings:JwtOptions:Secret").Value));

        var validation = new TokenValidationParameters
        {
            IssuerSigningKey = securityKey,
            ValidateLifetime = false,
            ValidateActor = false,
            ValidateIssuer = false,
            ValidateAudience = false
        };
        return new JwtSecurityTokenHandler().ValidateToken(jwtToken, validation, out _);
    }
}
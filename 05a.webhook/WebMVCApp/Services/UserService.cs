using AutoMapper;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    
    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }


    public async Task<User> AddAsync(User user)
    {
        return await _userRepository.AddAsync(user);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    public async Task<User> FindAsync(int id)
    {
        return await _userRepository.FindAsync(id);

    }
}
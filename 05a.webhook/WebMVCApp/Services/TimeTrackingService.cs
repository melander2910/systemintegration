using AutoMapper;
using WebMVCApp.DTO;
using WebMVCApp.Entities;
using WebMVCApp.Interfaces.Repositories;
using WebMVCApp.Interfaces.Services;

namespace WebMVCApp.Services;

public class TimeTrackingService : ITimeTrackingService
{
    private readonly ITimeTrackingRepository _timeTrackingRepository;
    private readonly IUserRepository _userRepository;
    private readonly IClientRepository _clientRepository;
    private readonly IMapper _mapper;
    
    public TimeTrackingService(ITimeTrackingRepository timeTrackingRepository, IUserRepository userRepository, IClientRepository clientRepository, IMapper mapper)
    {
        _timeTrackingRepository = timeTrackingRepository;
        _userRepository = userRepository;
        _clientRepository = clientRepository;
        _mapper = mapper;
    }

    public async Task<TimeTracking> AddAsync(TimeTrackingDto timeTrackingDto)
    {
        var timeTrackingEntity = _mapper.Map<TimeTracking>(timeTrackingDto);
        // var existingUser = await _userRepository.FindAsync(timeTrackingDto.UserId);
        // var existingClient = await _clientRepository.FindAsync(timeTrackingDto.ClientId);
        //
        // timeTrackingEntity.User = existingUser;
        // timeTrackingEntity.Client = existingClient;
        return await _timeTrackingRepository.AddAsync(timeTrackingEntity);
    }

    public async Task<IEnumerable<TimeTrackingDto>> GetAllAsync()
    {
        var timeTrackings = await _timeTrackingRepository.GetAllAsync();
        return timeTrackings.Select(t => _mapper.Map<TimeTrackingDto>(t));
    }

    public async Task<IEnumerable<TimeTrackingDto>> GetAllByUserIdAsync(int userId)
    {
        var timeTrackings = await _timeTrackingRepository.GetAllByUserIdAsync(userId);
        return timeTrackings.Select(t => _mapper.Map<TimeTrackingDto>(t));
    }

    public async Task<TimeTracking> GetById(int id)
    {
        return await _timeTrackingRepository.FindAsync(id);
    }
    
    public Task<TimeTracking> Update(int id, TimeTrackingDto timeTrackingDto)
    {
        var timeTracking = _mapper.Map<TimeTracking>(timeTrackingDto);
        return _timeTrackingRepository.Update(id, timeTracking);
    }

    public Task<bool> Delete(int id)
    {
        return _timeTrackingRepository.Delete(id);
    }
}
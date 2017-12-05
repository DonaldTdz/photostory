using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using photostory.Roles.Dto;
using photostory.Users.Dto;

namespace photostory.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}

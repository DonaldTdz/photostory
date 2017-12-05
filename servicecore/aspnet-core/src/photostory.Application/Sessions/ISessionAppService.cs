using System.Threading.Tasks;
using Abp.Application.Services;
using photostory.Sessions.Dto;

namespace photostory.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

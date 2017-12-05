using Abp.Application.Services;
using Abp.Application.Services.Dto;
using photostory.MultiTenancy.Dto;

namespace photostory.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

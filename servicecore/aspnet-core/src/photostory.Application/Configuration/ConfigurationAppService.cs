using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using photostory.Configuration.Dto;

namespace photostory.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : photostoryAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

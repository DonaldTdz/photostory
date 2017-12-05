using System.Threading.Tasks;
using photostory.Configuration.Dto;

namespace photostory.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

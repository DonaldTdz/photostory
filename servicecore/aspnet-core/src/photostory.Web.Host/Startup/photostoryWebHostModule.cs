using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using photostory.Configuration;

namespace photostory.Web.Host.Startup
{
    [DependsOn(
       typeof(photostoryWebCoreModule))]
    public class photostoryWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public photostoryWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(photostoryWebHostModule).GetAssembly());
        }
    }
}

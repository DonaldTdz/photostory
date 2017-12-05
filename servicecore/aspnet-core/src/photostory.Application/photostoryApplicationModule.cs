using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using photostory.Authorization;

namespace photostory
{
    [DependsOn(
        typeof(photostoryCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class photostoryApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<photostoryAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(photostoryApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(cfg =>
            {
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg.AddProfiles(thisAssembly);
            });
        }
    }
}

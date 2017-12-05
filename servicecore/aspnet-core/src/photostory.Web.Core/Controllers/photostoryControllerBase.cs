using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace photostory.Controllers
{
    public abstract class photostoryControllerBase: AbpController
    {
        protected photostoryControllerBase()
        {
            LocalizationSourceName = photostoryConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

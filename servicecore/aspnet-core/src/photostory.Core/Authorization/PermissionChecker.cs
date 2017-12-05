using Abp.Authorization;
using photostory.Authorization.Roles;
using photostory.Authorization.Users;

namespace photostory.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

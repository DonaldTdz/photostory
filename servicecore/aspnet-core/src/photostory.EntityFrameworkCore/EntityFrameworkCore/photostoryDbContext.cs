using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using photostory.Authorization.Roles;
using photostory.Authorization.Users;
using photostory.MultiTenancy;

namespace photostory.EntityFrameworkCore
{
    public class photostoryDbContext : AbpZeroDbContext<Tenant, Role, User, photostoryDbContext>
    {
        /* Define an IDbSet for each entity of the application */
        
        public photostoryDbContext(DbContextOptions<photostoryDbContext> options)
            : base(options)
        {
        }
    }
}

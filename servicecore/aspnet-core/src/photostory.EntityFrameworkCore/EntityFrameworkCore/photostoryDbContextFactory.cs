using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using photostory.Configuration;
using photostory.Web;

namespace photostory.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class photostoryDbContextFactory : IDesignTimeDbContextFactory<photostoryDbContext>
    {
        public photostoryDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<photostoryDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            photostoryDbContextConfigurer.Configure(builder, configuration.GetConnectionString(photostoryConsts.ConnectionStringName));

            return new photostoryDbContext(builder.Options);
        }
    }
}

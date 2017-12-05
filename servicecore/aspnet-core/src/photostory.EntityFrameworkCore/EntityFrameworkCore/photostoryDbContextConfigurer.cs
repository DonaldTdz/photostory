using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace photostory.EntityFrameworkCore
{
    public static class photostoryDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<photostoryDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<photostoryDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

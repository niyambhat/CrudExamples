using System;
using Trips.Models;

namespace Trips.Data
{
	public static class Extensions
	{
        public static void CreateDbIfNotExists(this IHost host)
        {
            {
                using (var scope = host.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    var context = services.GetRequiredService<ApplicationDbContext>();
                    context.Database.EnsureCreated();
                    DbInit.Initialize(context);
                }
            }
        }
    }
}


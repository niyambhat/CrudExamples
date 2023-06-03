using System;
using Microsoft.EntityFrameworkCore;
using Trips.Models;

namespace Trips.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Trip> Trips => Set<Trip>();

    }
}


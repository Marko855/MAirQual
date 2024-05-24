using Microsoft.EntityFrameworkCore;
using MAirQual.Models;

namespace MAirQual.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<FavoriteLocation> FavoriteLocations { get; set; } // Add this DbSet for FavoriteLocation entity

    }
}

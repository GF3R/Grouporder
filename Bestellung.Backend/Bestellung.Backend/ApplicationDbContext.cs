using Microsoft.EntityFrameworkCore;
namespace Bestellung.Backend;

    public class ApplicationDbContext : DbContext

    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Order> Order { get; set; }
        public DbSet<GroupOrder> GroupOrder { get; set; }
 

    }




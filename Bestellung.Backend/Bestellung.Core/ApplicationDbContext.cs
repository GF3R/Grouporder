using Bestellung.Core.Models;
using Microsoft.EntityFrameworkCore;
namespace Bestellung.Backend;

    public class ApplicationDbContext : DbContext

    {
        public DbSet<Order> Order { get; set; }
        public DbSet<GroupOrder> GroupOrder { get; set; }
        public DbSet<Item> Item { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
}




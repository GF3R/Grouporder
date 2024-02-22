
using Bestellung.Backend;
using Bestellung.Core.Models;
using Bestellung.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Bestellung.Database
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context)
        {
        }

        public List<Order> AllOrderByGroupOrderId(Guid Id)
        {
                return this.entities
                    .Include(o => o.Items)
                    .Where(o => o.GroupOrderId == Id)
                    .ToList();
        }
        public Order GetById(Guid Id)
        {
            return this.entities
                .Include(o => o.Items)
                .FirstOrDefault(o => o.Id == Id);
        }

    }
}
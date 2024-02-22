using Bestellung.Backend;
using Bestellung.Core.Models;
using Bestellung.Core.Repositories;

namespace Bestellung.Database
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {

        //public List<Item> AllItemByOrderId(Guid Id)
        //{
        //    return this.entities.Where(o => o.OrderId == Id).ToList();
        //}
        public ItemRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}

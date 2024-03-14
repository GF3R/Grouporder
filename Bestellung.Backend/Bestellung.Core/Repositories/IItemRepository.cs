using Bestellung.Core.Models;

namespace Bestellung.Core.Repositories
{
    public interface IItemRepository : IRepository<Item>
    {
        //List<Item> AllItemByOrderId(Guid Id);
    }

}

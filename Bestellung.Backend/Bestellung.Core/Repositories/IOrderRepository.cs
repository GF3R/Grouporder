using Bestellung.Core.Models;

namespace Bestellung.Core.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        List<Order> AllOrderByGroupOrderId(Guid Id);
        //Order GetById(Guid Id);
    }
   
}

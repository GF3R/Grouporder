using Bestellung.Backend;
using Bestellung.Core.Models;
using Bestellung.Core.Repositories;
using System.Text.RegularExpressions;

namespace Bestellung.Database
{
    public class GroupOrderRepository : Repository<GroupOrder>, IGroupOrderRepository
    {
        public GroupOrderRepository(ApplicationDbContext context) : base(context)
        {
        }


    }
}

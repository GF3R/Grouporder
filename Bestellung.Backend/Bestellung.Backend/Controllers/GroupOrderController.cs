using Bestellung.Backend.Dto;
using Bestellung.Core.Models;
using Bestellung.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Bestellung.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupOrderController : ControllerBase
    {

        private readonly IGroupOrderRepository groupOrderRepository;
        private readonly ApplicationDbContext dbContext;

        public GroupOrderController(
                               IGroupOrderRepository groupOrderRepository,
                               ApplicationDbContext dbContext)
        {
            this.groupOrderRepository = groupOrderRepository;
            this.dbContext = dbContext;
        }

        [HttpGet("getActiveGroupOrders")]
        public IActionResult GetActiveGroupOrders()
        {
            var groupOrders = groupOrderRepository.GetAll().OrderBy(t => t.Name);

            return Ok(groupOrders);
        }
        
        [HttpPost("addGroupOrder/{name}")]
        public async Task<ActionResult> AddGroupOrder(string name)
        {
            var newOrderToAdd = new GroupOrder
            {
                Id = Guid.NewGuid(),
                Name = name,
                Total = 0,
                Status = true,
            };

            await groupOrderRepository.Add(newOrderToAdd);
            await dbContext.SaveChangesAsync();
            return Ok(GetActiveGroupOrders());
        }

        [HttpDelete("deleteGroupOrder/{id}")]
        public async Task<ActionResult> DeleteGroupOrder(Guid id)
        {
            await groupOrderRepository.Delete(id);
            await dbContext.SaveChangesAsync();

            return Ok(GetActiveGroupOrders());

        }

        [HttpPut("updateGroupOrder/{id}/{name}")]
        public async Task<ActionResult> UpdateGroupOrder(string name, Guid id)
        {
            var groupOrderToUpdate = groupOrderRepository.GetById(id);

            groupOrderToUpdate.Name = name;

            await groupOrderRepository.Update(groupOrderToUpdate);
            await dbContext.SaveChangesAsync();

            return Ok(GetActiveGroupOrders());
        }

    }
}

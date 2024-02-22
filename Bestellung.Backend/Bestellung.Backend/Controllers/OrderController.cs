using Bestellung.Backend.Dto;
using Bestellung.Core.Models;
using Bestellung.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bestellung.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;
        private readonly IOrderRepository orderRepository;
        private readonly IGroupOrderRepository groupOrderRepository;
        private readonly IItemRepository itemRepository;

        public OrderController(IOrderRepository orderRepository,
                                 IGroupOrderRepository groupOrderRepository,
                                 IItemRepository itemRepository,
                                 ApplicationDbContext dbContext)
        {
            this.orderRepository = orderRepository;
            this.groupOrderRepository = groupOrderRepository;
            this.itemRepository = itemRepository;
            this.dbContext = dbContext;
        }

        [HttpGet("{id}/getCustomerOrders")]
        public IActionResult GetCustomerOrders(Guid id)
        {
            var allOrders = orderRepository.AllOrderByGroupOrderId(id);
            return Ok(allOrders);
        }

        [HttpPost("{id}/addCustomerOrder")]
        public async Task<ActionResult> AddCustomerOrder(Guid id, OrderDto newOrder)
        {
            var orderToAdd = new Order
            {
                Id = Guid.NewGuid(),
                CustomerName = newOrder.CustomerName,
                Total = newOrder.Total,
                GroupOrderId = id,
                Items = newOrder.Items.Select(itemDto => new Item
                {
                    Id = Guid.NewGuid(),
                    Name = itemDto.Name,
                }).ToList()
            };

            await orderRepository.Add(orderToAdd);
            await dbContext.SaveChangesAsync();

            await UpdateGroupOrderTotal(orderToAdd.GroupOrderId);

            return Ok(GetCustomerOrders(id));
        }

        [HttpPut("{id}/updateCustomerOrder")]
        public async Task<ActionResult> UpdateCustomerOrder(Guid id, OrderDto orderDto)
        {
            var order = orderRepository.GetById(id);

            order.CustomerName = orderDto.CustomerName;
            order.Total = orderDto.Total;

            foreach (var itemDto in orderDto.Items)
            {
                var existingItem = order.Items.FirstOrDefault(i => i.Id.ToString() == itemDto.Id);

                if (existingItem != null)
                {
                    existingItem.Name = itemDto.Name;
                }
            }

            await orderRepository.Update(order);
            await dbContext.SaveChangesAsync();
            await UpdateGroupOrderTotal(order.GroupOrderId);

            return Ok(GetCustomerOrders(id));
        }

        [HttpDelete("deleteCustomerOrder/{id}")]
        public async Task<ActionResult> DeleteCustomerOrder(Guid id)
        {
            var customerOrderToDelete = orderRepository.GetById(id);

            foreach (var item in customerOrderToDelete.Items)
            {
                await itemRepository.Delete(item.Id);
            }

            await orderRepository.Delete(id);
            await dbContext.SaveChangesAsync();
            await UpdateGroupOrderTotal(customerOrderToDelete.GroupOrderId);

            return Ok(GetCustomerOrders(customerOrderToDelete.GroupOrderId));
        }

        private async Task UpdateGroupOrderTotal(Guid Id)
        {
            var groupOrder = groupOrderRepository.GetById(Id);
            groupOrder.Total = orderRepository.AllOrderByGroupOrderId(Id).Sum(o => o.Total);
            await groupOrderRepository.Update(groupOrder);
            await dbContext.SaveChangesAsync();
        }

    }
}

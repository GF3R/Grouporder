using Bestellung.Backend.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Bestellung.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WeatherForecastController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getActiveGroupOrders")]
        public IActionResult GetActiveGroupOrders()
        {
            var groupOrders = _context.GroupOrder.Where(t => t.Status).ToList();
            return Ok(groupOrders);
        }

        [HttpPost("addGroupOrder")]
        public IActionResult AddGroupOrder(GroupOrderNameDto newOrder)
        {
            var newOrderToAdd = new GroupOrder
            {
                Id = Guid.NewGuid(),
                Name = newOrder.Name,
                Total = 0,
                Status = true,
            };

            _context.GroupOrder.Add(newOrderToAdd);
            _context.SaveChanges();
            return Ok(GetActiveGroupOrders());
        }

        [HttpDelete("deleteGroupOrders")]
        public IActionResult DeleteGroupOrders(Guid[] ids)
        {
            var groupOrdersToDelete = _context.GroupOrder.Where(t => ids.Contains(t.Id)).ToList();
            _context.GroupOrder.RemoveRange(groupOrdersToDelete);
            foreach (var deletedOrder in groupOrdersToDelete)
            {
                UpdateGroupOrderTotal(deletedOrder.Id);
            }

            _context.SaveChanges();

            return Ok(GetActiveGroupOrders());
        }

        [HttpPut("updateGroupOrders")]
        public IActionResult UpdateGroupOrder(List<GroupOrder> updatedOrders)
        {
            var orderIds = updatedOrders.Select(o => o.Id).ToList();

            var ordersToUpdate = _context.GroupOrder.Where(t => orderIds.Contains(t.Id)).ToList();
            foreach (var toUpdateOrder in ordersToUpdate)
            {
                var updatedOrder = updatedOrders.FirstOrDefault(o => o.Id == toUpdateOrder.Id);

                if (updatedOrder != null)
                {
                    toUpdateOrder.Name = updatedOrder.Name;
                }
            }

            _context.SaveChanges();

            return Ok(GetActiveGroupOrders());
        }

        [HttpGet("{id}/getCustomerOrders")]
        public IActionResult GetCustomerOrders(Guid id)
        {
            var orders = _context.Order
            .Where(order => order.GroupOrderId == id)
            .ToList();

            var ordersDto = orders.Select(order => new OrderGIdDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Items = order.Items.Split(','),
                Total = order.Total,
                GroupOrderId = order.GroupOrderId,
            }).ToList();

            return Ok(ordersDto);
        }

        [HttpPost("{id}/addCustomerOrder")]
        public IActionResult AddCustomerOrder(Guid id, OrderIdDto newOrder)
        {
            var newOrderToAdd = new Order
            {
                Id = Guid.NewGuid(),
                CustomerName = newOrder.CustomerName,
                Items = string.Join(", ", newOrder.Items),
                Total = newOrder.Total,
                GroupOrderId = id,
            };
            
            _context.Order.Add(newOrderToAdd);
            _context.SaveChanges();

            UpdateGroupOrderTotal(id);

            return GetCustomerOrders(id);
        }

        [HttpPut("{id}/updateCustomerOrders")]
        public IActionResult UpdateCustomerOrders(List<OrderDto> updatedOrders, Guid id)
        {
            var orderIds = updatedOrders.Select(o => o.Id).ToList();

            var ordersToUpdate = _context.Order.Where(t => orderIds.Contains(t.Id)).ToList();

            foreach (var toUpdateOrder in ordersToUpdate)
            {
                var updatedOrder = updatedOrders.FirstOrDefault(o => o.Id == toUpdateOrder.Id);

                if (updatedOrder != null)
                {
                    toUpdateOrder.CustomerName = updatedOrder.CustomerName;
                    toUpdateOrder.Items = updatedOrder.Items;
                    toUpdateOrder.Total = updatedOrder.Total;

                    UpdateGroupOrderTotal(toUpdateOrder.Id);
                }
            }

            _context.SaveChanges();

            return Ok(GetCustomerOrders(id));
        }

        [HttpDelete("deleteCustomerOrders")]
        public IActionResult DeleteCustomerOrder(Guid[] ids)
        {
            var customerOrdersToDelete = _context.Order.Where(t => ids.Contains(t.Id)).ToList();
            _context.Order.RemoveRange(customerOrdersToDelete);
            _context.SaveChanges(); 
            UpdateGroupOrderTotal(customerOrdersToDelete.First().GroupOrderId);
            return Ok(GetCustomerOrders(customerOrdersToDelete.First().GroupOrderId));
        }

        private void UpdateGroupOrderTotal(Guid groupId)
        {
            var groupOrder = _context.GroupOrder.FirstOrDefault(g => g.Id == groupId);
            if (groupOrder != null)
            {
                groupOrder.Total = _context.Order.Where(o => o.GroupOrderId == groupId).Sum(o => o.Total);
                _context.SaveChanges();
            }
        }

    }
}
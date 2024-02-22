//using Bestellung.Backend.Dto;
//using Bestellung.Core.Models;
//using Bestellung.Core.Repositories;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace Bestellung.Backend.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class BestellungController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        private readonly IOrderRepository orderRepository;
//        private readonly IGroupOrderRepository groupOrderRepository;
       

//        public BestellungController(IOrderRepository orderRepository)
//        {
//            _context = App.Resolve<ApplicationDbContext>();
//        }

//        [HttpGet("getActiveGroupOrders")]
//        public IActionResult GetActiveGroupOrders()
//        {
//            var groupOrders = _context.GroupOrder.Where(t => t.Status).OrderBy(t => t.Name).ToList();
//            return Ok(groupOrders);
//        }

//        [HttpPost("addGroupOrder")]
//        public IActionResult AddGroupOrder(GroupOrderNameDto newOrder)
//        {
//            var newOrderToAdd = new GroupOrder
//            {
//                Id = Guid.NewGuid(),
//                Name = newOrder.Name,
//                Total = 0,
//                Status = true,
//            };

//            _context.GroupOrder.Add(newOrderToAdd);
//            _context.SaveChanges();
//            return Ok(GetActiveGroupOrders());
//        }

//        [HttpDelete("deleteGroupOrder/{id}")]
//        public IActionResult DeleteGroupOrder(Guid id)
//        {
//            var groupOrderToDelete = _context.GroupOrder.FirstOrDefault(t => t.Id == id);

//            if (groupOrderToDelete == null)
//            {
//                return NotFound();
//            }

//            _context.GroupOrder.Remove(groupOrderToDelete);
//            _context.SaveChanges();

//            return Ok(GetActiveGroupOrders());

//        }

//        [HttpPut("updateGroupOrder/{id}")]
//        public IActionResult UpdateGroupOrder(GroupOrderNameDto groupOrder, Guid id)
//        {
//            var groupOrderToUpdate = _context.GroupOrder.FirstOrDefault(a => a.Id == id);
//            groupOrderToUpdate.Name = groupOrder.Name;

//            _context.SaveChanges();

//            return Ok(GetActiveGroupOrders());
//        }


//        [HttpGet("{id}/getCustomerOrders")]
//        public IActionResult GetCustomerOrders(Guid id)
//        {
//            var orders = _context.Order
//                .Include(order => order.Items)
//                .Where(order => order.GroupOrderId == id)
//                .ToList();

//            var ordersDto = orders.Select(order => new OrderGIdDto
//            {
//                Id = order.Id,
//                CustomerName = order.CustomerName,
//                Items = order.Items.Select(item => new ItemDto { Id = item.Id.ToString(), Name = item.Name }).ToList(),
//                Total = order.Total,
//                GroupOrderId = order.GroupOrderId,
//            }).OrderBy(o => o.CustomerName).ToList();

//            return Ok(ordersDto);
//        }

//        [HttpPost("{id}/addCustomerOrder")]
//        public IActionResult AddCustomerOrder(Guid id, OrderDto newOrder)
//        {
//            var newOrderToAdd = new Order
//            {
//                Id = Guid.NewGuid(),
//                CustomerName = newOrder.CustomerName,
//                Total = newOrder.Total,
//                GroupOrderId = id,
//            };

//            foreach (var itemDto in newOrder.Items)
//            {
//                var itemId = Guid.NewGuid();
//                var newItem = new Item
//                {
//                    Id = itemId,
//                    Name = itemDto.Name,
//                    OrderId = newOrderToAdd.Id 
//                };

//                newOrderToAdd.Items.Add(newItem);
//            }

//            _context.Order.Add(newOrderToAdd);
//            _context.SaveChanges();

//            UpdateGroupOrderTotal(id);

//            return GetCustomerOrders(id);
//        }

//        [HttpPut("{id}/updateCustomerOrder")]
//        public IActionResult UpdateCustomerOrder(Guid id, OrderDto orderDto)
//        {
//            var customerOrderToUpdate = _context.Order
//                .Include(o => o.Items)
//                .FirstOrDefault(a => a.Id == id);

//            if (customerOrderToUpdate == null)
//            {
//                return NotFound();
//            }

//            customerOrderToUpdate.CustomerName = orderDto.CustomerName;
//            customerOrderToUpdate.Total = orderDto.Total;

//            foreach (var itemDto in orderDto.Items)
//            {
//                var existingItem = customerOrderToUpdate.Items.FirstOrDefault(i => i.Id.ToString() == itemDto.Id);

//                if (existingItem != null)
//                {
//                    existingItem.Name = itemDto.Name;
//                }
//            }

//            _context.SaveChanges();
//            UpdateGroupOrderTotal(customerOrderToUpdate.GroupOrderId);

//            return Ok(GetCustomerOrders(id));
//        }

//        [HttpDelete("deleteCustomerOrder/{id}")]
//        public IActionResult DeleteCustomerOrder(Guid id)
//        {
//            var customerOrderToDelete = _context.Order.FirstOrDefault(t => t.Id == id);

//            if (customerOrderToDelete == null)
//            {
//                return NotFound();
//            }

//            _context.Item.RemoveRange(customerOrderToDelete.Items);

//            _context.Order.Remove(customerOrderToDelete);

//            _context.SaveChanges();

//            UpdateGroupOrderTotal(customerOrderToDelete.GroupOrderId);

//            return Ok(GetCustomerOrders(customerOrderToDelete.GroupOrderId));
//        }

//        private void UpdateGroupOrderTotal(Guid groupId)
//        {
//            var groupOrder = _context.GroupOrder.FirstOrDefault(g => g.Id == groupId);
//            if (groupOrder != null)
//            {
//                groupOrder.Total = _context.Order.Where(o => o.GroupOrderId == groupId).Sum(o => o.Total);
//                _context.SaveChanges();
//            }
//        }

//    }
//}

using System;
using System.Collections.Generic;

namespace Bestellung.Backend
{
    public class Order
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
        public long Total { get; set; }
        public virtual GroupOrder GroupOrder { get; set; }
        public Guid GroupOrderId { get; set; }
    }

    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }
    }

    public class GroupOrder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long Total { get; set; }
        public bool Status { get; set; } = true;
    }
}

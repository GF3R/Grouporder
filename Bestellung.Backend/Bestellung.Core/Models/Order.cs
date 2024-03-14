using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Bestellung.Core.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
       
        public virtual IEnumerable<Item> Items { get; set; }
        public long Total { get; set; }
        public virtual GroupOrder GroupOrder { get; set; }
        public Guid GroupOrderId { get; set; }

    }
}

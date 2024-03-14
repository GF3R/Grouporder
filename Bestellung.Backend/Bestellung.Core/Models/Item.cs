using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Bestellung.Core.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid OrderId { get; set; }
        [JsonIgnore] public virtual Order Order { get; set; }
    }
}

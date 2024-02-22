using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bestellung.Core.Models
{
    public class GroupOrder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long Total { get; set; }
        public bool Status { get; set; } = true;
    }
}

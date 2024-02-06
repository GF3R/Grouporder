namespace Bestellung.Backend
{
    public class Order
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        public string Items { get; set; }
        public long Total { get; set; }
       
        public Guid GroupOrderId { get; set; }
        public virtual GroupOrder GroupOrder { get; set; }
    }

    public class GroupOrder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long Total { get; set; }
        public bool Status { get; set; } = true;
       
    }
}

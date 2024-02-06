namespace Bestellung.Backend.Dto
{
    public class OrderDto
    {
        public string CustomerName { get; set; }
        public Guid Id { get; set; }
        public string Items { get; set; }
        public long Total { get; set; }

    }
}

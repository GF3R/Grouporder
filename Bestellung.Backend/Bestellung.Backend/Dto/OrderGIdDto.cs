namespace Bestellung.Backend.Dto
{
    public class OrderGIdDto
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        public string[] Items { get; set; }
        public long Total { get; set; }
        public Guid GroupOrderId { get; set; }
    }
}

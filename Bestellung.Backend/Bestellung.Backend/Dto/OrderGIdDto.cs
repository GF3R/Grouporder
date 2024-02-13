namespace Bestellung.Backend.Dto
{
    public class OrderGIdDto
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; }
        /*public string[] Items { get; set; }*/ // Change to string array
        public virtual ICollection<ItemDto> Items { get; set; } = new List<ItemDto>();

        public long Total { get; set; }
        public Guid GroupOrderId { get; set; }
    }
}

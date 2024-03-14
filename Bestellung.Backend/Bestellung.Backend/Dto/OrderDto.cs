namespace Bestellung.Backend.Dto
{
    public class OrderDto
    {
        public string CustomerName { get; set; }
        public virtual IEnumerable<ItemDto> Items { get; set; }
        public long Total { get; set; }

    }
}

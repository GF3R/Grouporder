namespace Bestellung.Backend.Dto
{
    public class OrderDto
    {
        public string CustomerName { get; set; }
        public virtual ICollection<ItemDto> Items { get; set; } = new List<ItemDto>();
        //public string[] Items { get; set; }
        public long Total { get; set; }

    }
}

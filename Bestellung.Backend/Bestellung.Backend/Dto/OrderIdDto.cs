namespace Bestellung.Backend.Dto
{
    public class OrderIdDto
    { 
        public string CustomerName { get; set; }
        public string[] Items { get; set; }
        public long Total { get; set; }
    }
}

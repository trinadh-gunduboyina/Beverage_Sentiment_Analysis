namespace CustomerSentimentAPI.Models
{
    public class Review
    {
        public int Id { get; set; }
        public required string Text { get; set; }
        public required string Brand { get; set; }
        public string? Sentiment { get; set; }
    }
}

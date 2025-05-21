using Azure;
using Azure.AI.TextAnalytics;

public class SentimentService
{
    private readonly TextAnalyticsClient _client;

    public SentimentService(IConfiguration config)
    {
        var endpoint = config["AzureCognitiveServices:Endpoint"] 
            ?? throw new ArgumentNullException(nameof(config), "Azure Cognitive Services endpoint is not configured");
        var key = config["AzureCognitiveServices:Key"]
            ?? throw new ArgumentNullException(nameof(config), "Azure Cognitive Services key is not configured");
        
        _client = new TextAnalyticsClient(new Uri(endpoint), new AzureKeyCredential(key));
    }

    public async Task<string> AnalyzeSentimentAsync(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return "Neutral";
        DocumentSentiment result = await _client.AnalyzeSentimentAsync(text);
        return result.Sentiment.ToString(); // Positive, Negative, Neutral
    }
}

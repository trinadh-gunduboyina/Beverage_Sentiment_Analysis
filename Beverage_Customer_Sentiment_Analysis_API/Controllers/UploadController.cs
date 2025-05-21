namespace CustomerSentimentAPI.Controllers
{
    using CsvHelper;
    using CsvHelper.Configuration;
    using CustomerSentimentAPI.Models;
    using Microsoft.AspNetCore.Mvc;
    using System.Formats.Asn1;
    using System.Globalization;

    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly SentimentService _sentimentService;

        public UploadController(SentimentService sentimentService)
        {
            _sentimentService = sentimentService;
        }

        [HttpPost("reviews")]
        public async Task<IActionResult> UploadReviews(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HeaderValidated = null, // Ignore missing headers  
                MissingFieldFound = null // Ignore missing fields  
            };

            using var csv = new CsvReader(reader, csvConfig);

            var records = csv.GetRecords<Review>().ToList();

            foreach (var review in records)
            {
                review.Sentiment = await _sentimentService.AnalyzeSentimentAsync(review.Text);
            }

            return Ok(records);
        }
    }

}

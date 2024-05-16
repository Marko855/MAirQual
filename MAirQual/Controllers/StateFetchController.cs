using Microsoft.AspNetCore.Mvc;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StateFetchController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public StateFetchController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("state")]
        public async Task<IActionResult> GetStateData(string country,string state)
        {
            try
            {
                // Your AirVisual API key
                string apiKey = "e91fc4aa-cb69-4841-a5d9-d82d321df5ec";
                var httpClient = _httpClientFactory.CreateClient();

                // Make GET request to AirVisual API for state data
                HttpResponseMessage response = await httpClient.GetAsync($"http://api.airvisual.com/v2/cities?state={state}&country={country}&key={apiKey}");

                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                return Ok(responseBody);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error fetching state data: {ex.Message}");
            }
        }
    }
}

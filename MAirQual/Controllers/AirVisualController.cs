using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AirVisualController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AirVisualController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetCityData(string city, string state, string country)
        {
            try
            {
                // Your AirVisual API key
                string apiKey = "e91fc4aa-cb69-4841-a5d9-d82d321df5ec";
                var httpClient = _httpClientFactory.CreateClient();

                // Make GET request to AirVisual API
                HttpResponseMessage response = await httpClient.GetAsync($"http://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key={apiKey}");

                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                return Ok(responseBody);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error fetching city data: {ex.Message}");
            }
        }
    }
}

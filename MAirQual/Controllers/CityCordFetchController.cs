using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CityCordFetchController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CityCordFetchController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("city")]
        public async Task<IActionResult> GetCityCordData(float latitude, float longitude)
        {
            try
            {
                // Your AirVisual API key
                string apiKey = "e91fc4aa-cb69-4841-a5d9-d82d321df5ec";
                var httpClient = _httpClientFactory.CreateClient();

                // Make GET request to AirVisual API
                HttpResponseMessage response = await httpClient.GetAsync($"http://api.airvisual.com/v2/nearest_city?lat={latitude}&lon={longitude}&key={apiKey}");

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

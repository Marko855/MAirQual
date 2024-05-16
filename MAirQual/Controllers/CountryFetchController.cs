using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountryFetchController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public CountryFetchController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("country")]
        public async Task<IActionResult> GetCountryData(string country)
        {
            try
            {
                // Your AirVisual API key
                string apiKey = "e91fc4aa-cb69-4841-a5d9-d82d321df5ec";

                // Make GET request to AirVisual API for country data
                HttpResponseMessage response = await _httpClient.GetAsync($"http://api.airvisual.com/v2/states?country={country}&key={apiKey}");

                // Ensure a successful response
                response.EnsureSuccessStatusCode();

                // Read response content
                string responseBody = await response.Content.ReadAsStringAsync();

                // Return the response as IActionResult
                return Ok(responseBody);
            }
            catch (HttpRequestException ex)
            {
                // Log the error for troubleshooting
                Console.WriteLine($"Error fetching country data: {ex.Message}");
                // Return a 500 Internal Server Error response
                return StatusCode(500, "An error occurred while fetching country data.");
            }
            catch (Exception ex)
            {
                // Log any unexpected errors
                Console.WriteLine($"Unexpected error: {ex.Message}");
                // Return a 500 Internal Server Error response
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}

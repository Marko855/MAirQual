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
                string apiKey = "e91fc4aa-cb69-4841-a5d9-d82d321df5ec";

                HttpResponseMessage response = await _httpClient.GetAsync($"http://api.airvisual.com/v2/states?country={country}&key={apiKey}");

                if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                {
                    return StatusCode(429, "Too many requests. Please try again later.");
                }

                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                return Ok(responseBody);
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Error fetching country data: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching country data.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}

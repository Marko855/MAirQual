using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CityNameFetchController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CityNameFetchController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("city")]
        public async Task<IActionResult> GetCityNameData(string city,string state,string country)
        {
            try
            {
                string apiKey = "e91fc4aa-cb69-4841-a5d9-d82d321df5ec";
                var httpClient = _httpClientFactory.CreateClient();

                HttpResponseMessage response =
                    await httpClient.
                    GetAsync($"http://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key=&key={apiKey}");

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

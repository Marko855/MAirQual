using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MAirQual.Models;
using MAirQual.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MAirQual.DTO;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FavoritesController : ControllerBase
    {
        private readonly UserService _userService;

        public FavoritesController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetFavorites()
        {
            var claims = User.Claims;
            var email = claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (email == null)
            {
                return Unauthorized();
            }

            var user = _userService.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Retrieve user's favorite locations from the database or any storage mechanism
            var favorites = _userService.GetFavorites(user.Id);

            // Join favorite locations into a comma-separated string
            var favoritesString = string.Join(", ", favorites);
            Console.WriteLine(favoritesString);
            return Ok(favoritesString);
        }

        [HttpPost]
        public IActionResult AddFavoriteLocation(FavoriteLocationRequest request)
        {
            var claims = User.Claims;
            var email = claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            Console.WriteLine(email);
            if (email == null)
            {
                return Unauthorized();
            }

            var user = _userService.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            Console.WriteLine(user.Id);

            // Check if the favorite location already exists
            if (_userService.FavoriteLocationExists(user.Id, request.Location))
            {
                return BadRequest(new { message = "Favorite location already exists" });
            }

            // Save the favorite location for the user in the database
            _userService.AddFavoriteLocation(user.Id, request.Location);

            return Ok(new { message = "Favorite location added successfully" });
        }

        [HttpDelete("{index}")]
        public IActionResult DeleteFavoriteLocation(int index)
        {
            var claims = User.Claims;
            var email = claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (email == null)
            {
                return Unauthorized();
            }

            var user = _userService.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Remove the favorite location from the database or any storage mechanism
            _userService.DeleteFavoriteLocation(user.Id, index);

            return Ok(new { message = "Favorite location deleted successfully" });
        }
    }
}

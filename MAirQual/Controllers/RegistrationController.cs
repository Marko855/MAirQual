using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MAirQual.Models;
using MAirQual.Services;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly UserService _userService;

        public RegistrationController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Register([FromBody] UserRegistrationRequest request)
        {
            try
            {
                // Check if the provided email already exists
                if (_userService.UserExists(request.Email))
                {
                    return Conflict("User already exists");
                }

                // Create a new user object
                var newUser = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = request.Password // Note: Password hashing should be used in a real-world application
                };

                // Register the new user
                _userService.RegisterUser(newUser);

                // Return success message
                return Ok("Registration successful");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, "An error occurred while registering the user.");
            }
        }
    }
    public class UserRegistrationRequest
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}

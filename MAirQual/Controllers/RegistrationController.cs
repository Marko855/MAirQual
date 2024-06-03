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
                if (_userService.UserExists(request.Email))
                {
                    return Conflict("User already exists");
                }

                var newUser = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = request.Password 
                };

                _userService.RegisterUser(newUser);

                return Ok("Registration successful");
            }
            catch (Exception ex)
            {
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

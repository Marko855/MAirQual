using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
            // Currently, we are not using the UserService but keeping it for future use
            // Return success message for every registration attempt
            return Ok("Registration successful");
        }
    }

    public class UserRegistrationRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}

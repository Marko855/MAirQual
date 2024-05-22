using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MAirQual.Services;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly UserService _userService;

        public LoginController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserLoginRequest request)
        {
            // Authenticate user based on provided email and password
            var user = _userService.Authenticate(request.Email, request.Password);

            // Check if user exists and credentials are correct
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            // Return success message
            return Ok("Login successful");
        }
    }
    public class UserLoginRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}

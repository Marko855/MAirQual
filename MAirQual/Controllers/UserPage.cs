using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MAirQual.Models;
using MAirQual.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserPageController : ControllerBase
    {
        private readonly UserService _userService;

        public UserPageController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUserProfile()
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

            return Ok(new
            {
                user.Username,
                user.Email,
                OtherClaims = claims // Include other non-null claims in the response
            });
        }
    }
}

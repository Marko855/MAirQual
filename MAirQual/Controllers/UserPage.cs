using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MAirQual.Models;
using MAirQual.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Threading.Tasks;
using System.Diagnostics;

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
                OtherClaims = claims
            });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUserProfile(UserUpdateModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

            var updateResult = await _userService.UpdateUser(user, model);

            if (updateResult.Success)
            {
                return Ok(updateResult.Message);
            }
            else
            {
                return StatusCode(500, updateResult.Message);
            }
        }


    }
}

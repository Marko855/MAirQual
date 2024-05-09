using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAirQual.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MAirQual.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly UserService _userService;

        public RegistrationController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            try
            {
                // You may want to add validation logic here

                await _userService.RegisterUser(request.Email, request.Password);
                return Ok("Registration successful");
            }
            catch (Exception ex)
            {
                return BadRequest($"Registration failed: {ex.Message}");
            }
        }
    }

    public class UserRegistrationRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using MAirQual.Services;
using Microsoft.IdentityModel.Tokens;

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

            // Generate JWT token
            var token = GenerateJwtToken(user.Email);

            // Return success message along with token
            return Ok(new { message = "Login successful", token });
        }

        private string GenerateJwtToken(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    throw new ArgumentException("Email cannot be null or empty");
                }
                var key_generated = "3e334e7c7f4659026c90fb1d4f24e2da6039382563b68aa4fa39fc460f6afc38a6ebec88d9ca1f5ff87d0d29392b7d62f356115e910e0278359f578c9b69986b";
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(key_generated);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("email", email) }),
                    Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (ArgumentException ex)
            {
                // Log the ArgumentException and handle it appropriately
                throw new Exception("Error generating JWT token: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Log other exceptions and handle them appropriately
                throw new Exception("Error generating JWT token: " + ex.Message);
            }
        }
    }

    public class UserLoginRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}

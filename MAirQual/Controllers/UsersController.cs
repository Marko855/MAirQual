using MAirQual.Services;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _userService.GetAllUsers(); 
        return Ok(users);
    }
}

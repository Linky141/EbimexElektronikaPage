namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<Entities.User> userManager;

    public AccountController(UserManager<Entities.User> userManager)
    {
        this.userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<Entities.User>> Login(DTOs.LoginDto loginDto)
    {
        var user = await userManager.FindByNameAsync(loginDto.UserName);
        if (user == null || !await userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();
        return user;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register (DTOs.RegisterDto registerDto)
    {
        var user = new Entities.User { 
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };
        var result = await userManager.CreateAsync(user, registerDto.Password);
        if(!result.Succeeded)
        {
            foreach(var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        await userManager.AddToRoleAsync(user, "Member");
        return StatusCode(201);
    }

















}
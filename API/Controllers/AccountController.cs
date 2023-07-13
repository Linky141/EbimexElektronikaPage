namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<Entities.User> userManager;
    private readonly ApiServices.TokenService tokenService;

    public AccountController(UserManager<Entities.User> userManager, ApiServices.TokenService tokenService)
    {
        this.tokenService = tokenService;
        this.userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<DTOs.UserDto>> Login(DTOs.LoginDto loginDto)
    {
        var user = await userManager.FindByNameAsync(loginDto.UserName);
        if (user == null || !await userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();
        return new DTOs.UserDto
        {
            Username = user.UserName,
            Email = user.Email,
            Token = await tokenService.GenerateToken(user)
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(DTOs.RegisterDto registerDto)
    {
        var user = new Entities.User
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };
        var result = await userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        await userManager.AddToRoleAsync(user, "Member");
        return StatusCode(201);
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<DTOs.UserDto>> GetCurrentUser()
    {
        var user = await userManager.FindByNameAsync(User.Identity.Name);
        return new DTOs.UserDto
        {
            Username = user.UserName,
            Email = user.Email,
            Token = await tokenService.GenerateToken(user)
        };
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("users")]
    public ActionResult<List<DTOs.UserDto>> GetUsers()
    {
        var users = userManager.Users;
        List<DTOs.UserDto> dto = new();
        foreach (var user in users)
        {
            dto.Add(new DTOs.UserDto { Username = user.UserName, Email = user.Email });
        }
        return dto;
    }
}
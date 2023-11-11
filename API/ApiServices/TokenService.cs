namespace API.ApiServices;

public class TokenService
{
    private readonly IConfiguration config;
    private readonly UserManager<Entities.User> userManager;
    public TokenService(UserManager<Entities.User> userManager, IConfiguration config)
    {
        this.userManager = userManager;
        this.config = config;

    }

    public async Task<string> GenerateToken(Entities.User user)
    {
        var claims = new List<Claim>{
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        var roles = await userManager.GetRolesAsync(user);
        Log.Information("GenerateToken Roles => {@roles}", roles);
        
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:TokenKey"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenOptions = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }










}
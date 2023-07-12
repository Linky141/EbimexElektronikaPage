using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(API.RequestHelpers.MappingProfiles).Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put bearer + your token inside box bellow",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            jwtSecurityScheme, Array.Empty<string>()
        }
    });
});
builder.Services.AddDbContext<ServiceContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddIdentityCore<API.Entities.User>(opt => { opt.User.RequireUniqueEmail = true; }).AddRoles<IdentityRole>().AddEntityFrameworkStores<ServiceContext>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddScoped<API.ApiServices.TokenService>();
builder.Services.AddScoped<API.ApiServices.ImageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<API.Middleware.ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
    });
}

app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var servicecontext = scope.ServiceProvider.GetRequiredService<ServiceContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<API.Entities.User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await servicecontext.Database.MigrateAsync();
    await DbInitializer.Initialize(servicecontext, userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem migrating data");
}
finally
{
    scope.Dispose();
}

app.Run();

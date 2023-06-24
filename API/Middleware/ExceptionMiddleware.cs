namespace API.Middleware;

public class ExceptionMiddleware
{
    public RequestDelegate RequestDelegate { get; }
    public IHostEnvironment HostEnvironment { get; }
    private readonly ILogger<ExceptionMiddleware> logger;
    public ExceptionMiddleware(RequestDelegate requestDelegate, ILogger<ExceptionMiddleware> logger, IHostEnvironment hostEnvironment)
    {
        this.logger = logger;
        this.HostEnvironment = hostEnvironment;
        this.RequestDelegate = requestDelegate;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await RequestDelegate(context);
        }
        catch (System.Exception ex)
        {
            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            var response = new ProblemDetails
            {
                Status = 500,
                Detail = HostEnvironment.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Title = ex.Message
            };

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}
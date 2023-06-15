namespace API.Data;

public class ServiceContext : DbContext
{
    protected ServiceContext(DbContextOptions options) : base(options)
    { }
}
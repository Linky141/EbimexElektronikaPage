namespace API.Data;

public class ServiceContext : DbContext
{
    public ServiceContext(DbContextOptions options) : base(options)
    { }

    public DbSet<Entities.Service> Services { get; set; }

}
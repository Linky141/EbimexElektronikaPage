namespace API.Data;

public class ServiceContext : IdentityDbContext<Entities.User>
{
    public ServiceContext(DbContextOptions options) : base(options)
    { }

    public DbSet<Entities.Service> Services { get; set; }
    public DbSet<Entities.Contact> Contacts { get; set; }
    public DbSet<Entities.Info> Infos { get; set; }
    public DbSet<Entities.Configuration> Configurations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
        );
    }

}
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebMVCApp.Entities;

namespace WebMVCApp.Data;

public class ApplicationDbContext : IdentityDbContext<ExtendedIdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer("Server=localhost,1433;Database=WebMVCApp;User=sa;Password=MyPass@word;TrustServerCertificate=true");

    public DbSet<ExtendedIdentityUser> ApplicationUsers { get; set; }

}
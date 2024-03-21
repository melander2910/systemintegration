using Microsoft.EntityFrameworkCore;
using WebMVCApp.Entities;

namespace WebMVCApp.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options)
    {
    }
    
    public DbSet<Client> Clients { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<TimeTracking> TimeTrackings { get; set; }
    public DbSet<WebhookRegistration> WebhookRegistrations { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options.UseSqlServer("Server=localhost,1433;Database=WebMVCApp;User=sa;Password=MyPass@word;TrustServerCertificate=true");
    
    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     // Configure the relationship between User and Client
    //     modelBuilder.Entity<User>()
    //         .HasMany(u => u.Clients)
    //         .WithOne(c => c.Client)
    //         .HasForeignKey(c => c.)
    //         .IsRequired();
    // }
}
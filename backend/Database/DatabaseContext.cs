using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Database;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Section> Sections => Set<Section>();
    public DbSet<Event> Events => Set<Event>(); //Table for the custom user events
}
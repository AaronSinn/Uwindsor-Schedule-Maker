namespace backend.Database;

public static class Extensions
{
    public static void CreateDbIfNotExists(this IHost host)
    {
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<DatabaseContext>();
                context.Database.EnsureCreated();
                DbInitializer.Initialize(context);
            }
        }
        Console.Write("----------------\nDatabase created :)\n----------------\n");
    }
}
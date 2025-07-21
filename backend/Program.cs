using backend.Database;
//using backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add the PizzaContext
builder.Services.AddSqlite<DatabaseContext>("Data Source=database.db");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader()
     .WithOrigins("https://localhost:5150", "https://uwindsor-schedule-maker-cjg6eqcccyd9edeh.canadacentral-01.azurewebsites.net")
     .SetIsOriginAllowed(origin => true));

app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

// Add the CreateDbIfNotExists method call
// Uncomment if you dont have a db
//app.CreateDbIfNotExists();

app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();
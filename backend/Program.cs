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
     .AllowAnyMethod()
     .AllowAnyHeader()
     .AllowCredentials()
     .WithOrigins("https://localhost:5150")
     .SetIsOriginAllowed(origin => true));


app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

// Add the CreateDbIfNotExists method call
app.CreateDbIfNotExists();

app.Run();
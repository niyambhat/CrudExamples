using Microsoft.EntityFrameworkCore;
using Trips.Data;
using Trips.Models;
using Microsoft.OpenApi.Models;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("https://localhost:44416", "https://localhost:44416");
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Trips API",
        Description = "Making the trips you love",
        Version = "v1"
    });
});

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSqlite<ApplicationDbContext>("Data Source=App.db");

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Trips API");
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.CreateDbIfNotExists();
app.UseHttpsRedirection();
app.UseCors("CORSPolicy");
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


//Trips CRUD 

app.MapGet("/trips", async (ApplicationDbContext db) => await db.Trips.ToListAsync());
app.MapGet("/trips/{id}", async (ApplicationDbContext db, int id) => await db.Trips.FindAsync(id));
app.MapDelete("/trips/{id}", async (ApplicationDbContext db, int id) =>
{
    var trip = await db.Trips.FindAsync(id);
    if (trip is null)
    {
        return Results.NotFound();
    }
    db.Trips.Remove(trip);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapPost("/trips", async (ApplicationDbContext db, Trip trip) =>
{
    await db.Trips.AddAsync(trip);
    await db.SaveChangesAsync();
    return Results.Created($"/trips/{trip.Id}", trip);
});

app.MapPut("/trips/{id}", async (ApplicationDbContext db, Trip updateTrip, int id) =>
{
    var trip = await db.Trips.FindAsync(id);
    if (trip is null)
    {
        return Results.NotFound();
    }
    trip.Name = updateTrip.Name;
    trip.Description = updateTrip.Description;
    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.Run();


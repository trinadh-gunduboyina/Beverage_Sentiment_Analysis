var builder = WebApplication.CreateBuilder(args);

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // restrict to React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<SentimentService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS before any middleware that handles requests
app.UseCors("AllowFrontend");

// Comment HTTPS redirection if you're running backend on HTTP (port 5000)
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

var builder = WebApplication.CreateBuilder(args);

// Render injects PORT env var — honour it
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(
                "http://localhost:3000",
                "https://portfolio-fe-swapnil-guptas-projects-2fb8af3d.vercel.app",
                "https://portfolio-backend-q8ap.onrender.com"
            )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();

// Handle CORS preflight
app.MapMethods("/api/contact", new[] { "OPTIONS" }, () => Results.Ok()).RequireCors(p =>
    p.WithOrigins(
        "http://localhost:3000",
        "https://portfolio-fe-swapnil-guptas-projects-2fb8af3d.vercel.app"
    ).AllowAnyHeader().AllowAnyMethod().AllowCredentials());

// POST /api/contact
app.MapPost("/api/contact", async (ContactRequest req, IConfiguration config) =>
{
    // Read from appsettings first (dev), then fall back to env vars (production)
    var emailUser  = config["Email:User"]  ?? Environment.GetEnvironmentVariable("EMAIL_USER");
    var emailPass  = config["Email:Pass"]  ?? Environment.GetEnvironmentVariable("EMAIL_PASS");
    var ownerEmail = config["Email:Owner"] ?? Environment.GetEnvironmentVariable("OWNER_EMAIL") ?? emailUser;

    if (string.IsNullOrEmpty(emailUser) || string.IsNullOrEmpty(emailPass))
        return Results.Problem("Email configuration is missing.");

    try
    {
        using var smtp = new SmtpClient();

        // Connect with STARTTLS on port 587 (Gmail standard)
        await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(emailUser, emailPass);

        // ── (A) Notification to owner ──────────────────────────────────────
        var ownerMsg = new MimeMessage();
        ownerMsg.From.Add(new MailboxAddress("Portfolio Contact Form", emailUser));
        ownerMsg.To.Add(new MailboxAddress("Swapnil Gupta", ownerEmail!));
        ownerMsg.Subject = "New Enquiry Received";
        ownerMsg.Body = new TextPart("html") { Text = OwnerEmailHtml(req) };
        await smtp.SendAsync(ownerMsg);

        // ── (B) Confirmation to user ────────────────────────────────────────
        var userMsg = new MimeMessage();
        userMsg.From.Add(new MailboxAddress("Swapnil Gupta", emailUser));
        userMsg.To.Add(new MailboxAddress(req.Name, req.Email));
        userMsg.Subject = "Thanks for reaching out!";
        userMsg.Body = new TextPart("html") { Text = UserEmailHtml(req.Name) };
        await smtp.SendAsync(userMsg);

        await smtp.DisconnectAsync(true);

        return Results.Ok(new { message = "Emails sent successfully." });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Failed to send email: {ex.Message}");
    }
})
.WithName("SendContactEmail")
.WithSummary("Send enquiry emails")
.WithDescription("Sends a notification to the owner and a confirmation to the user.");

app.Run();

// ── HTML Templates ──────────────────────────────────────────────────────────

static string OwnerEmailHtml(ContactRequest r) => $"""
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;">New Enquiry Received</h1>
      </div>
      <div style="padding:32px;">
        {Row("Name",    r.Name)}
        {Row("Email",   r.Email)}
        {Row("Phone",   r.Phone)}
        <div style="margin-bottom:16px;">
          <p style="margin:0 0 6px;color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</p>
          <div style="background:#1e293b;border-radius:10px;padding:16px;color:#e2e8f0;line-height:1.6;">{r.Message}</div>
        </div>
      </div>
      <div style="padding:16px 32px;background:#1e293b;text-align:center;color:#64748b;font-size:12px;">
        Sent from your Portfolio Contact Form
      </div>
    </div>
    """;

static string Row(string label, string value) => $"""
    <div style="margin-bottom:16px;padding:14px 16px;background:#1e293b;border-radius:10px;border-left:3px solid #3b82f6;">
      <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">{label}</p>
      <p style="margin:0;color:#f1f5f9;font-weight:600;">{value}</p>
    </div>
    """;

static string UserEmailHtml(string name) => $"""
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;">Thanks for reaching out!</h1>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;line-height:1.7;color:#cbd5e1;">Hi <strong style="color:#fff;">{name}</strong>,</p>
        <p style="font-size:15px;line-height:1.8;color:#94a3b8;">
          Thanks for your interest in my profile. I've received your message and will get back to you as soon as possible.
        </p>
        <p style="font-size:15px;line-height:1.8;color:#94a3b8;">In the meantime, feel free to connect with me:</p>
        <div style="text-align:center;margin:28px 0;">
          <a href="https://wa.me/918979180931"
             style="display:inline-block;background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:15px;">
            Chat on WhatsApp
          </a>
        </div>
        <p style="font-size:14px;color:#64748b;text-align:center;">Or simply reply to this email.</p>
      </div>
      <div style="padding:24px 32px;background:#1e293b;text-align:center;">
        <p style="margin:0;font-weight:700;color:#fff;">Swapnil Gupta</p>
        <p style="margin:4px 0 0;color:#64748b;font-size:13px;">Software Engineer · Full Stack Developer</p>
      </div>
    </div>
    """;

record ContactRequest(string Name, string Email, string Phone, string Message);

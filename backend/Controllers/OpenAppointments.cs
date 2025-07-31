using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Hosting;

[ApiController]
[Route("api/[controller]")]
public class OpenAppointmentsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetOpenAppointments()
    {
        var openAppointments = new[]
        {
            new { Id = 1, Date = DateTime.Now.AddDays(3), Time = "10:00 AM", Doctor = "Dr. Smith"},
            new { Id = 2, Date = DateTime.Now.AddDays(4), Time = "12:00 PM", Doctor = "Dr. Smith"},
            new { Id = 3, Date = DateTime.Now.AddDays(5), Time = "10:30 AM", Doctor = "Dr. Smith"}
        };

        return Ok(openAppointments);
    }
}
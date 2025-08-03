using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Hosting;

[ApiController]
[Route("api/[controller]")]
public class OpenAppointmentsController : ControllerBase
{
    private static List<OpenAppointmentsModel> _appointments = GetSampleAppointments();

    [HttpGet]
    public IActionResult GetOpenAppointments()
    {
        if (_appointments == null || _appointments.Count == 0)
        {
            return NotFound("No open appointments available.");
        }

        return Ok(_appointments);
    }

    [HttpGet("{id}")]
    public IActionResult GetOpenAppointmentsById(int id)
    {
        if (_appointments == null || _appointments.Count == 0)
        {
            return NotFound("No open appointments available.");
        }

        var appointment = _appointments.FirstOrDefault(a => a.Id == id);
        if (appointment == null)
        {
            return NotFound($"Appointment with ID {id} not found.");
        }

        return Ok(appointment);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAppointment(int id, [FromBody] OpenAppointmentsModel updatedAppointment)
    {
        var appointment = _appointments.FirstOrDefault(a => a.Id == id);
        if (appointment == null)
        {
            return NotFound($"Appointment with ID {id} not found.");
        }

        appointment.Date = updatedAppointment.Date;
        appointment.Time = updatedAppointment.Time;
        appointment.Doctor = updatedAppointment.Doctor;
        appointment.PricePerHour = updatedAppointment.PricePerHour;
        appointment.Notes = updatedAppointment.Notes;

        return Ok(appointment);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAppointment(int id)
    {
        var appointment = _appointments.FirstOrDefault(a => a.Id == id);
        if (appointment == null)
        {
            return NotFound($"Appointment with ID {id} not found.");
        }

        _appointments.Remove(appointment);
        return Ok($"Appointment with ID {id} deleted successfully.");
    }

    private static List<OpenAppointmentsModel> GetSampleAppointments()
    {
        return new List<OpenAppointmentsModel>
        {
            new OpenAppointmentsModel { Id = 1, Date = DateTime.Now.AddDays(3), Time = "10:00 AM", Doctor = "Dr. Smith", PricePerHour = 100.00m },
            new OpenAppointmentsModel { Id = 2, Date = DateTime.Now.AddDays(4), Time = "12:00 PM", Doctor = "Dr. Jones", PricePerHour = 200.00m },
            new OpenAppointmentsModel { Id = 3, Date = DateTime.Now.AddDays(5), Time = "10:30 AM", Doctor = "Dr. Smith", PricePerHour = 100.00m },
            new OpenAppointmentsModel { Id = 4, Date = DateTime.Now.AddDays(6), Time = "11:00 AM", Doctor = "Dr. Michael", PricePerHour = 150.00m },
            new OpenAppointmentsModel { Id = 5, Date = DateTime.Now.AddDays(7), Time = "1:00 PM", Doctor = "Dr. Grant", PricePerHour = 250.00m }
        };
    }
}
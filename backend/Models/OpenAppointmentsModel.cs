public class OpenAppointmentsModel
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? Time { get; set; }
    public string? Doctor { get; set; }
    public decimal? PricePerHour { get; set; }
    public string? Notes { get; set; }
}
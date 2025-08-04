import Appointment from "../../Models/AppointmentModel";

const API_BASE_URL = "http://localhost:5000/api/OpenAppointments";

export async function fetchAppointments(): Promise<Appointment[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function updateAppointment(updated: Appointment): Promise<Appointment> {
  const res = await fetch(`${API_BASE_URL}/${updated.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}

export async function addAppointment(appointment: Appointment): Promise<Appointment> {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment)
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}
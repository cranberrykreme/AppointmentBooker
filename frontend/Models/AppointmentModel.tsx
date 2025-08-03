export default interface Appointment {
  id: number;
  date: string;
  time?: string;
  doctor?: string;
  pricePerHour?: number;
  notes?: string;
}
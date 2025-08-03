export default interface Appointment {
  id: number;
  date: Date;
  time?: string;
  doctor?: string;
  pricePerHour?: number;
  notes?: string;
}
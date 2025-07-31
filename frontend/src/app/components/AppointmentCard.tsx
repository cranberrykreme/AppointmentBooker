interface AppointmentCardProps {
  date: string;
  time: string;
  doctor: string;
}

export default function AppointmentCard({ date, time, doctor }: AppointmentCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Doctor:</strong> {doctor}</p>
    </div>
  );
}
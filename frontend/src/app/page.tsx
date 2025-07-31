import AppointmentList from "./components/AppointmentList";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Open Appointments</h1>
      <AppointmentList />
    </main>
  );
}

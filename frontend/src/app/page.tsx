"use client";
import {useEffect, useState} from 'react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data from backend...");
    fetch('http://localhost:5000/api/OpenAppointments')
      .then(res => res.json())
      .then((data: Appointment[]) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => console.error("Fetch error:", err));

    console.log("Data fetched successfully.");
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Open Appointments</h1>
      <ul>
        {appointments.map(app => (
          <li key={app.id}>
            {new Date(app.date).toLocaleDateString()} - {app.time} with {app.doctor}
          </li>
        ))}
      </ul>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/OpenAppointments")
      .then(res => res.json())
      .then((data: Appointment[]) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!appointments.length) return <p>No appointments available.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map(a => (
        <AppointmentCard key={a.id} {...a} />
      ))}
    </div>
  );
}
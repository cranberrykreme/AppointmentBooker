"use client";

import { useEffect, useState, useRef } from "react";
import AppointmentCard from "../../Presentational/AppointmentCardContainer/AppointmentCard";
import Appointment from "../../../../../Models/AppointmentModel";
import styles from "./AppointmentList.module.css";

export default function AppointmentList() {
  const appointmentsRef = useRef<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/OpenAppointments")
      .then(res => res.json())
      .then((data: Appointment[]) => {
        appointmentsRef.current = data;
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!appointmentsRef.current.length) return <p>No appointments available.</p>;

  return (
    <div className={styles.appointmentListContainer}>
      {appointmentsRef.current.map((_, index) => (
        <AppointmentCard key={appointmentsRef.current[index].id} 
        appointmentRef={appointmentsRef}
        index={index} />
      ))}
    </div>
  );
}
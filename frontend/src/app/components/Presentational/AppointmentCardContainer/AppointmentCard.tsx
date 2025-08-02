import Appointment from "../../../../../Models/AppointmentModel";
import styles from "./AppointmentCard.module.css";
import { RefObject } from "react";

export default function AppointmentCard({appointmentRef, index }: {appointmentRef: RefObject<Appointment[]>, index: number}) {
  const appointment = appointmentRef.current?.[index];
  if (!appointment) return null;

  return (
    <div className={styles.appointmentCardContainer}>
      <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <p><strong>Doctor:</strong> {appointment.doctor}</p>
      <p><strong>Price Per Hour:</strong> ${appointment.pricePerHour}</p>
    </div>
  );
}
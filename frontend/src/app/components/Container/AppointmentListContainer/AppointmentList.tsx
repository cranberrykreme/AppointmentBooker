"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import AppointmentCard from "../../Presentational/AppointmentCardContainer/AppointmentCard";
import Appointment from "../../../../../Models/AppointmentModel";
import AppointmentModal from "../../Presentational/AppointmentModalContainer/AppointmentModal";
import { useOpenAppointments } from "@/hooks/useOpenAppointments";
import styles from "./AppointmentList.module.css";

export default function AppointmentList() {
  const {appointments, loading, save} = useOpenAppointments();
  const selectedAppointmentRef = useRef<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  

  // Handle the card click to open the modal
  const handleCardClick = (ref: Appointment) => {
    selectedAppointmentRef.current = ref;
    setModalOpen(true);
  }

  const handleAddClick = () => {
    selectedAppointmentRef.current = null;
    setModalOpen(true);
  }

  if (loading) return <p>Loading...</p>;
  if (!appointments.length) return <p>No appointments available.</p>;

  return (
    <>
      <div className={styles.appointmentListContainer}>
        {appointments.map((app) => (
          <AppointmentCard key={app.id} 
          appointment={app}
          onClick={() => handleCardClick(app)} />
        ))}

        {modalOpen && (
          <AppointmentModal
            appointmentRef={selectedAppointmentRef}
            onClose={() => setModalOpen(false)}
            onSave={(updated: Appointment) => {
              save(updated);
            }}
          />
        )}
      </div>

      <button 
        className={styles.addAppointmentButton}
        onClick={handleAddClick}>
          + Add Appointment
      </button>
    </>

  );
}
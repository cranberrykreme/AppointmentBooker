"use client";
import { RefObject, useState, useEffect, useCallback } from "react";
import styles from "./AppointmentModal.module.css";
import Appointment from "../../../../../Models/AppointmentModel";

export default function AppointmentModal(
    { appointmentRef, onClose, onSave }: 
    {appointmentRef: RefObject<Appointment | null>, onClose: () => void, onSave: (updated: Appointment) => void}){
        const appointment = appointmentRef.current;
        const [notes, setNotes] = useState(appointment?.notes ? appointment.notes : "");

        if(!appointment) return null;

        // Ensure onClose reference stays stable for effect
        const handleClose = useCallback(() => {
            onClose();
        }, [onClose]);

        // Escape key listener
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    handleClose();
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [handleClose]);

        // Handle save changes
        const handleSaveClick = () => {
            const updated = { ...appointment, notes };
            appointmentRef.current = updated;
            onSave(updated);
            onClose();
        };

        const handleOverlayClick = () => {
            onClose();
        };

        return (
            <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                <div className={styles.modalContentBuffer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={onClose}>X</button>

                        <h2>Appointment Details</h2>
                        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {appointment.time}</p>
                        <p><strong>Doctor:</strong> {appointment.doctor}</p>
                        
                        <textarea
                            className={styles.textarea}
                            placeholder="Add notes..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        
                        <div className={styles.buttonActions}>
                            <button onClick={handleSaveClick} className={styles.saveButton}>Save Changes</button>
                            <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
};
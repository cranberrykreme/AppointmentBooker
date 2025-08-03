"use client";
import { RefObject, useState, useEffect, useCallback } from "react";
import styles from "./AppointmentModal.module.css";
import Appointment from "../../../../../Models/AppointmentModel";

export default function AppointmentModal(
    { appointmentRef, onClose, onSave }: 
    {appointmentRef: RefObject<Appointment | null>, onClose: () => void, onSave: (updated: Appointment) => void}){
        const appointment = appointmentRef.current;
        const [notes, setNotes] = useState(appointment?.notes ? appointment.notes : "");
        const [doctor, setDoctor] = useState(appointment?.doctor ? appointment.doctor : "");
        const [pricePerHour, setPricePerHour] = useState(appointment?.pricePerHour ? appointment.pricePerHour : 0);
        const [date, setDate] = useState(appointment?.date ? new Date(appointment.date) : new Date());
        const [time, setTime] = useState(appointment?.time ? appointment.time : "");
        const doctorOptions: Record<string, number> = {"Dr. Smith": 100, "Dr. Jones": 200, "Dr. Brown": 135, 
                                "Dr. Grant": 250, "Dr. Michael": 150, "Dr. Who": 350};

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

        // Update doctor and price per hour when doctor changes
        const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedDoctor = e.target.value;
            setDoctor(selectedDoctor);
            setPricePerHour(doctorOptions[selectedDoctor]);
        };

        function generateTimeOptions(): string[] {
            const options: string[] = [];
            let start = new Date();
            start.setHours(9, 30, 0, 0);
            let end = new Date();
            end.setHours(16, 30, 0, 0);
            while (start <= end) {
                let hours = start.getHours();
                const minutes = start.getMinutes().toString().padStart(2, "0");

                const ampm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12 || 12; // Convert 0 -> 12 for midnight/noon

                options.push(`${hours}:${minutes} ${ampm}`);

                start.setMinutes(start.getMinutes() + 15);
            }
            return options;
        }

        const times = generateTimeOptions();

        // Handle save changes
        const handleSaveClick = () => {
            const updated = { 
                ...appointment, 
                doctor,
                pricePerHour,
                notes,
                date,
                time
            };
            appointmentRef.current = updated;
            onSave(updated);
            onClose();
        };

        const handleOverlayClick = () => {
            onClose();
        };

        const handleDateUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(e.target.value);
            setDate(newDate);
        };

        return (
            <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                <div className={styles.modalContentBuffer} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={onClose}>X</button>

                        <h2>Appointment Details</h2>
                        <p className={styles.pLabel}><strong>Date:</strong> 
                            <input 
                                type="date"
                                className={styles.dateInput}
                                value={date.toISOString().split('T')[0]}
                                onChange={handleDateUpdate}
                            />
                        </p>
                        <p className={styles.pLabel}><strong>Time:</strong>
                            <select 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)} 
                                className={styles.optionsSelect}>
                                {times.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <p className={styles.pLabel}><strong>Doctor:</strong> 
                            <select 
                                value={doctor} 
                                onChange={handleDoctorChange} 
                                className={styles.optionsSelect}>
                                {Object.keys(doctorOptions).map((doc) => (
                                    <option key={doc} value={doc}>
                                        {doc} - ${doctorOptions[doc]}
                                    </option>
                                ))}
                            </select>
                        </p>

                        <p className={styles.pLabel}><strong>Price per Hour:</strong> ${pricePerHour}</p>
                        
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
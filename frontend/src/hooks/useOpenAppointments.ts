import { useState, useEffect } from "react";
import Appointment from "../../Models/AppointmentModel";
import { fetchAppointments, updateAppointment, addAppointment } from "../services/openAppointmentService";

export function useOpenAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAppointments();
            setAppointments(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const save = async (updated: Appointment) => {
        if(appointments.some(appt => appt.id === updated.id)){
            const saved = await updateAppointment(updated);
            setAppointments(prev => prev.map(a => (a.id === saved.id ? saved : a)));
        } else { // Add a new appointment
            const savedNew = await addAppointment(updated);
            setAppointments(prev => [...prev, savedNew]);
        }
    };

    return { appointments, loading, error, save, reload: load };
}
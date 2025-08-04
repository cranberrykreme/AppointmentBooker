'use client';

import AppointmentList from "@/app/components/Container/AppointmentListContainer/AppointmentList";
import styles from "./page.module.css";
import React from "react";

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className="page-title">Open Appointments</h1>
      <AppointmentList />
    </div>
  );
}

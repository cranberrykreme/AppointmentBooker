"use client";

import AppointmentList from "./components/Container/AppointmentListContainer/AppointmentList";
import styles from "./page.module.css";
import React, { useEffect } from "react";

export default function HomePage() {


  return (
    <div className={styles.pageContainer}>
      <h1 className="page-title">Open Appointments</h1>
      <AppointmentList />
    </div>
  );
}

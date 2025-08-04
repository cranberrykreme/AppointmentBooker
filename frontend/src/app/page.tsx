"use client";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className="page-title">Welcome to our appointment booking system</h1>
      <button className={styles.button}>
        <a href="/appointments">Look at appointments</a>
      </button>
    </div>
  );
}

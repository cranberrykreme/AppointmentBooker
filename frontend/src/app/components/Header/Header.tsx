"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Appointment Booker</Link>
            </div>

            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/appointments">Appointments</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
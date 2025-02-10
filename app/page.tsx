"use client";

import { useEffect } from "react";
import "./globals.css";

export default function Page() {
useEffect(() => {
    if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
            console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
            console.log("Service Worker registration failed:", error);
        });
    });
    }
}, []);

return (
    <main>
    <h1>Welcome to Ayana</h1>
    </main>
);
}

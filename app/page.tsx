"use client";

import { useEffect } from "react";
import "./globals.css";

export default function Page() {
  useEffect(() => {
    window.location.href = "/home";
  }, []);

  return null;
}

"use client";

import Navbar from "@/src/components/landing/navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

"use client";

import { AboutComponent } from "@/components/about/about";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutComponent />
      <Footer />
    </>
  );
}

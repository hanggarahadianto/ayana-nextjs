"use client";

import { AboutComponent } from "@/components/page/about/about";
import Footer from "@/components/page/landing/footer";
import Navbar from "@/components/page/landing/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutComponent />
      <Footer />
    </>
  );
}

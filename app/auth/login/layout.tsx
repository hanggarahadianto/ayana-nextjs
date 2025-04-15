"use client";

import Footer from "@/components/page/landing/footer";
import Navbar from "@/components/page/landing/navbar";
import { SimpleGrid } from "@mantine/core";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <SimpleGrid>
        {children}
        <Footer />
      </SimpleGrid>
    </>
  );
}

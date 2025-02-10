"use client";

import { AboutComponent } from "@/src/components/about/about";
import Footer from "@/src/components/landing/footer";
import Navbar from "@/src/components/landing/navbar";
import { AppShell, Text, Grid, Card, Image, Button, Group, Container, AspectRatio } from "@mantine/core";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutComponent />
      <Footer />
    </>
  );
}

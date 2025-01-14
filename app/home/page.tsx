"use client";

import Footer from "@/src/components/landing/footer";
import LandingPage from "@/src/components/landing/landingpage";
import { Navbar } from "@/src/components/landing/navbar";
import Testimony from "@/src/components/landing/testimony";
import ProductsPage from "../product/page";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
      <ProductsPage />
      <Testimony />
      <Footer />
    </>
  );
};

export default HomePage;

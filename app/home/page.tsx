"use client";

import Footer from "@/src/components/landing/footer";
import LandingPage from "@/src/components/landing/landingpage";
import Testimony from "@/src/components/landing/testimony";
import ProductsPage from "../product/page";
import Navbar from "@/src/components/landing/navbar";

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

"use client";

import Footer from "@/components/landing/footer";
import LandingPage from "@/components/landing/landingpage";
import Navbar from "@/components/landing/navbar";
import Testimony from "@/components/landing/testimony";
import ProductPage from "app/product/page";

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <LandingPage /> */}
      {/* <ProductPage /> */}
      <Testimony />
      <Footer />
    </>
  );
};

export default HomePage;

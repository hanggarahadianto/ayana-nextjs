"use client";

import Footer from "@/components/landing/footer";
import LandingPage from "@/components/landing/landingpage";
import Navbar from "@/components/landing/navbar";
import Testimony from "@/components/landing/testimony";
import { Box, Flex, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ProductPage from "app/product/page";

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <Navbar />

      {/* Jarak antar section diatur berdasarkan ukuran layar */}

      <LandingPage />

      {/* <Testimony /> */}
      {/* <Footer /> */}

      {/* </div> */}
      {/* <div style={{ minHeight: "100vh" }}>
      </div> */}
      {/* <div style={{ minHeight: "100vh" }}>
      </div>  */}
    </>
  );
};

export default HomePage;

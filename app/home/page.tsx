"use client";

import LandingPage from "@/components/page/landing/landingpage";
import Navbar from "@/components/page/landing/navbar";
import SeoHome from "@/components/seo/seo";

const HomePage = () => {
  return (
    <>
      {/* <SeoHome /> */}
      <Navbar />
      <LandingPage />
    </>
  );
};

export default HomePage;

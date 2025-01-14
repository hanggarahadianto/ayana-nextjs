"use client";

import Footer from "@/src/components/landing/footer";
import LandingPage from "@/src/components/landing/landingpage";
import { Navbar } from "@/src/components/landing/navbar";
import Testimony from "@/src/components/landing/testimony";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// const [queryClient] = useState(() => new QueryClient()); // Create a QueryClient instance
const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <LandingPage />
        {/* <ProductsPage /> */}
        <Testimony />
        <Footer />
      </QueryClientProvider>
    </>
  );
};

export default HomePage;

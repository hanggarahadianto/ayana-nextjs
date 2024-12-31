"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProductsPage from "./product/page";
import Navbar from "./landing/navbar";
import LandingPage from "./landing/landingpage";
import Footer from "./landing/footer";

const queryClient = new QueryClient();

function MyApp() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <LandingPage />
        <ProductsPage />
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

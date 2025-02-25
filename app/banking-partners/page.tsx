"use client";

import { BankingPartnerComponent } from "@/components/banking-partner/banking-partner";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

const BankingPartnersPage = () => {
  return (
    <>
      <Navbar />
      <BankingPartnerComponent />
      <Footer />
    </>
  );
};

export default BankingPartnersPage;

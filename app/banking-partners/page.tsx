"use client";

import { BankingPartnerComponent } from "@/src/components/banking-partner/banking-partner";
import Footer from "@/src/components/landing/footer";
import Navbar from "@/src/components/landing/navbar";

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

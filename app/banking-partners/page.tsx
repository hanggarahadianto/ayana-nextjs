"use client";

import { BankingPartnerComponent } from "@/components/page/banking-partner/banking-partner";
import Footer from "@/components/page/landing/footer";
import Navbar from "@/components/page/landing/navbar";

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

"use client"; // ✅ Ensure it's a client component

import { useSearchParams } from "next/navigation";
import Footer from "@/components/page/landing/footer";
import Navbar from "@/components/page/landing/navbar";
import FloatingWhatsApp from "@/components/page/product/FloatingWhatsapp";
import ProductDetail from "@/components/page/product/ProductDetail";

export default function ProductDetailPage() {
  const searchParams = useSearchParams();

  const homeId = searchParams.get("id"); // Ambil dari query parameter

  if (!homeId) {
    return <p>Product not found</p>;
  }

  console.log;

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <ProductDetail productId={homeId} />

      <Footer />
    </>
  );
}

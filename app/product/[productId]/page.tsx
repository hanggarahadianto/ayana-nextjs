"use client"; // ✅ Ensure it's a client component

import { useParams, useSearchParams } from "next/navigation";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import ProductDetail from "@/components/product/ProductDetail";
import FloatingWhatsApp from "@/components/product/FloatingWhatsapp";

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

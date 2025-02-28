"use client"; // ✅ Ensure it's a client component

import { useParams } from "next/navigation";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import ProductDetailComponent from "@/components/product/product-detail";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.productId as string; // Ensure it's a string

  if (!productId) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <Navbar />
      <ProductDetailComponent productId={productId} />
      <Footer />
    </>
  );
}

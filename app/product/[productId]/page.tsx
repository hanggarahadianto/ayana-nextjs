"use client";

import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import ProductDetailComponent from "@/components/product/product-detail";

const ProductDetailPage = () => {
  return (
    <>
      <Navbar />
      <ProductDetailComponent />
      <Footer />
    </>
  );
};

export default ProductDetailPage;

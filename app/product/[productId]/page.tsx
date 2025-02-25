import React from "react";
import Navbar from "@/src/components/landing/navbar";
import Footer from "@/src/components/landing/footer";
import ProductDetailComponent from "@/src/components/product/product-detail";

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

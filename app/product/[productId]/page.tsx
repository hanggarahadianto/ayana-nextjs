import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import ProductDetailComponent from "@/components/product/product-detail";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = params;
  return (
    <>
      <Navbar />
      <ProductDetailComponent productId={productId} />
      <Footer />
    </>
  );
};

export default ProductPage;

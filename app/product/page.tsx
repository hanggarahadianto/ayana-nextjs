// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchProducts } from "@/src/utils/api";
// import ProductCard from "@/src/components/ProductCard";
// import { Grid, Loading, Text } from "@nextui-org/react";

// const ProductsPage = () => {
//   const { data, error, isLoading } = useQuery(["products"], fetchProducts);

//   if (isLoading) return <Loading size="xl" />;
//   if (error) return <Text color="error">Error fetching products</Text>;

//   return (
//     <Grid.Container gap={2} justify="flex-start">
//       {data.map((product: { id: string; name: string; image: string }) => (
//         <Grid xs={12} sm={6} md={4} key={product.id}>
//           <ProductCard
//             id={product.id}
//             name={product.name}
//             image={product.image}
//           />
//         </Grid>
//       ))}
//     </Grid.Container>
//   );
// };

// export default ProductsPage;

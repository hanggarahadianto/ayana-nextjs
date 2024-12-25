// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/router";
// import { fetchProductById } from "@/src/utils/api";
// import { Card, Text, Loading } from "@nextui-org/react";

// const ProductDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const { data, error, isLoading } = useQuery(
//     ["product", id],
//     () => fetchProductById(id as string),
//     {
//       enabled: !!id, // Only run the query if id is defined
//     }
//   );

//   if (isLoading) return <Loading size="xl" />;
//   if (error) return <Text color="error">Error fetching product details</Text>;

//   return (
//     <Card>
//       <Card.Body>
//         <Card.Image src={data.image} alt={data.name} objectFit="cover" />
//         <Text h2>{data.name}</Text>
//         <Text>{data.description}</Text>
//         <Text h4>${data.price}</Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductDetailsPage;

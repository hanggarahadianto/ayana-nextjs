// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useMediaQuery } from "@mantine/hooks";
// import { Card, Stack, Text, Image, Flex, Group, Badge, Container } from "@mantine/core";
// import { Carousel } from "@mantine/carousel";
// import Link from "next/link";
// import { generateSlug } from "@/utils/slug";

// const ProductComponent = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const isTablet = useMediaQuery("(max-width: 1024px)");

//   // Fetch products data
//   const { data: productData, isLoading } = useQuery({
//     queryKey: ["getProductData"],
//     queryFn: getDataProduct,
//     refetchOnWindowFocus: false,
//   });

//   const products = productData?.data || [];

//   const getResponsiveValue = (mobile: any, tablet: any, desktop: any) => {
//     return isMobile ? mobile : isTablet ? tablet : desktop;
//   };

//   return (
//     <Container size="xl" py={getResponsiveValue(12, 24, 60)}>
//       <Stack align="center" justify="center">
//         <Text size={getResponsiveValue("2rem", "3rem", "3.5rem")} fw={900} c="#e7a17a" ta="center" style={{ fontFamily: "Lora" }}>
//           AYANA HOUSES
//         </Text>
//         <Text size={getResponsiveValue("1.8rem", "2.5rem", "3.5rem")} fw={900} c="#e7a17a" ta="center" style={{ fontFamily: "Lora" }}>
//           ON SALE PROJECT
//         </Text>
//       </Stack>

//       <Carousel
//         p={getResponsiveValue(20, 60, 80)}
//         withIndicators
//         slideSize={getResponsiveValue("60%", "50%", "33.33%")}
//         slideGap={getResponsiveValue("xs", "sm", "md")}
//         loop
//         height={getResponsiveValue(350, 600, 800)}
//         align="start"
//       >
//         {products.map((product: IProduct) => (
//           <Carousel.Slide key={product.id}>
//             <Link
//               href={{
//                 pathname: `/product/${generateSlug(product.title)}`,
//                 query: { id: product.id }, // Kirim home.id sebagai query parameter
//               }}
//               passHref
//               style={{ textDecoration: "none", cursor: "pointer" }}
//             >
//               <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: "pointer" }}>
//                 <Card.Section>
//                   <Image src={product.image} alt={product.title} height={getResponsiveValue(180, 280, 300)} fit="cover" />
//                 </Card.Section>

//                 {/* <Group mt={30}>
//                   <Text size={getResponsiveValue("sm", "md", "lg")}>{product.address}</Text>
//                   {!isMobile && (
//                     <Group align="flex-end" justify="flex-end">
//                       <Text fw={900}>Start from</Text>
//                       <Text size="md" fw={900} c="green">
//                         {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price)}
//                       </Text>
//                     </Group>
//                   )}
//                 </Group> */}

//                 {!isMobile && (
//                   <Text size={getResponsiveValue("md", "lg", "xl")} fw={700} mt={12}>
//                     {product.title}
//                   </Text>
//                 )}

//                 <Text size={getResponsiveValue("xs", "sm", "md")} c="dimmed" mt={8}>
//                   {product.content}
//                 </Text>

//                 {isMobile && (
//                   <Stack align="flex-end" mt={12}>
//                     <Flex gap={8}>
//                       <Text fw={600} size={getResponsiveValue("xs", "sm", "md")}>
//                         Start from
//                       </Text>
//                       <Text fw={800} size="sm" c="green">
//                         {(product.price / 1_000_000).toFixed(0)} Juta
//                       </Text>
//                     </Flex>
//                   </Stack>
//                 )}

//                 <Flex justify="space-between" align="center">
//                   <Badge color={product.status === "sale" ? "green" : "pink"}>{product.status === "sale" ? "On Sale" : "Sold"}</Badge>
//                   <Text fw={900} size={getResponsiveValue("xs", "sm", "lg")} c="dimmed">
//                     {product.quantity > 0 ? `Tersedia ${product.quantity} unit` : "Terjual Habis"}
//                   </Text>
//                 </Flex>
//               </Card>
//             </Link>
//           </Carousel.Slide>
//         ))}
//       </Carousel>
//     </Container>
//   );
// };

// export default ProductComponent;

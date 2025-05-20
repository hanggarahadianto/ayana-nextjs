import React from "react";
import { Modal, Paper, Text, ScrollArea, Flex, Group, Badge, Stack, Grid, Image, TextInput, Divider, Card, Textarea } from "@mantine/core";
import LoadingGlobal from "@/styles/loading/loading-global";
import NextImage from "next/image";

import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/api/products/getImagesProduct";
import CloudinaryImage from "@/components/common/image/CloudinaryImage";

const GetProductModal = ({
  opened,
  onClose,
  productData,
  isLoadingDetail,
}: {
  opened: boolean;
  onClose: () => void;
  productData?: IProduct;
  isLoadingDetail: boolean;
}) => {
  const productId = productData?.id;

  const {
    data: dataImages,
    isLoading: isLoadingImageData,
    isPending: isPendngImageData,
  } = useQuery({
    queryKey: ["getImagesByProductId", productId],
    queryFn: () => getImages(productId),
    enabled: !!productId,
  });

  // console.log("productData", productData);

  const getBadgeColor = (status: string | undefined) => {
    switch (status) {
      case "available":
        return { bg: "green" };
      case "booking":
        return { bg: "yellow" };
      case "sold":
        return { bg: "red" };
      default:
        return { bg: "gray" };
    }
  };
  const { bg } = getBadgeColor(productData?.status);
  return (
    <>
      <Modal opened={opened} onClose={onClose} size={"60rem"} yOffset="100px">
        <LoadingGlobal visible={isLoadingDetail || isLoadingImageData} />

        <ScrollArea>
          <Paper p="md" shadow="sm">
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="lg" fw={500}>
                  {productData?.title}
                </Text>
                <Badge p="16x" bg={bg}>
                  <Text size="xs" fw={500}>
                    {productData?.status}
                  </Text>
                </Badge>
              </Group>

              <Divider />
              <Grid mt={"10px"}>
                <Grid.Col span={6}>
                  <TextInput label="Tipe" value={productData?.type ?? ""} readOnly />

                  <TextInput label="Price" value={`Rp ${productData?.price.toLocaleString()}`} readOnly />
                  <TextInput label="Start Price" value={`Rp ${productData?.start_price.toLocaleString()}`} readOnly />
                  <TextInput label="Urutan" value={productData?.sequence ?? ""} readOnly />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Bedrooms" value={productData?.bedroom ?? ""} readOnly />
                  <TextInput label="Bathrooms" value={productData?.bathroom ?? ""} readOnly />
                  <TextInput label="Square Meters" value={productData?.square ?? ""} readOnly />
                  <TextInput label="Quantity" value={productData?.quantity ?? ""} readOnly />
                </Grid.Col>
              </Grid>
              <Textarea label="Deskripsi" value={productData?.content ?? ""} readOnly />

              <Divider />
              {(productData?.near_bies?.length ?? 0) > 0 && (
                <>
                  <Text size="md" fw={500}>
                    Lokasi Terdekat
                  </Text>
                  <Grid>
                    {productData?.near_bies?.map((nearby, idx) => (
                      <Grid.Col key={idx} span={{ base: 12, sm: 6 }}>
                        <Card shadow="xs" radius="md" withBorder>
                          <Text fw={500}>{nearby.name}</Text>
                          <Text size="sm" c="dimmed">
                            {nearby.distance} menit
                          </Text>
                        </Card>
                      </Grid.Col>
                    ))}
                  </Grid>
                </>
              )}

              <Divider mt={"40px"} />

              <Grid mt={"20px"}>
                {dataImages?.images?.map((img, idx) => (
                  <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                    <LoadingGlobal visible={isLoadingImageData || isPendngImageData} />

                    <Card shadow="sm" padding="sm" radius="md" withBorder>
                      <Card.Section>
                        <CloudinaryImage src={img.url} alt={`Image ${idx}`} />
                      </Card.Section>

                      <Text size="sm" mt="xs" ta="center" c="dimmed">
                        Gambar {idx + 1}
                      </Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Paper>
        </ScrollArea>
      </Modal>
    </>
  );
};

export default GetProductModal;

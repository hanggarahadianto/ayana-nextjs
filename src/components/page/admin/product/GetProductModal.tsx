import React, { useEffect, useState } from "react";
import { Modal, Paper, Text, ScrollArea, Flex, Group, Badge, Stack, Grid, Image, TextInput, Divider, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";

const GetProductModal = ({ productData }: { productData?: IProduct }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (opened) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 700); // 2 detik

      return () => clearTimeout(timer);
    }
  }, [opened]);

  console.log("info data");

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2.5rem"
        icon={<IconEye size="1rem" />}
        gradient="linear-gradient(135deg, #D8B4FE, #E9D5FF)"
      />

      <Modal opened={opened} onClose={close} size={"60rem"} title="Product Details" yOffset="100px">
        <LoadingGlobal visible={showLoading} />

        <ScrollArea>
          <Paper p="md" shadow="sm">
            <Stack gap="md">
              <Image
                src={productData?.image}
                alt={productData?.title}
                radius="md"
                height={productData?.image ? 400 : "auto"} // Ensures height is 200px if an image exists
                style={{ maxHeight: 400, objectFit: "cover" }} // Prevents stretching beyond 200px
              />

              <Text size="lg" fw={500}>
                {productData?.title}
              </Text>
              <Divider />
              <Grid>
                <Grid.Col span={6}>
                  <TextInput label="Urutan" value={productData?.sequence} readOnly />

                  <TextInput label="Address" value={productData?.address} readOnly />
                  <TextInput label="Location" value={productData?.location} readOnly />
                  <TextInput label="Price" value={`Rp ${productData?.price.toLocaleString()}`} readOnly />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Bedrooms" value={productData?.bedroom} readOnly />
                  <TextInput label="Bathrooms" value={productData?.bathroom} readOnly />
                  <TextInput label="Square Meters" value={productData?.square} readOnly />
                </Grid.Col>
              </Grid>
              <TextInput label="Status" value={productData?.status} readOnly />
              <TextInput label="Quantity" value={productData?.quantity} readOnly />
              <Divider />
              {/* <TextInput label="Harga Awal" value={formatCurrency(infoData?.start_price ?? 0)} readOnly /> */}
              <TextInput label="Quantity" value={productData?.quantity} readOnly />
            </Stack>
          </Paper>
        </ScrollArea>
      </Modal>
    </>
  );
};

export default GetProductModal;

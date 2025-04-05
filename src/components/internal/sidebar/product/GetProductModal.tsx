import React, { useEffect, useState } from "react";
import { Modal, Paper, Text, ScrollArea, Flex, Group, Badge, Stack, Grid, Image, TextInput, Divider, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import BreathingActionIcon from "@/lib/button/buttonAction";
import LoadingGlobal from "@/styles/loading/loading-global";

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
                  <TextInput label="Urutan" value={productData?.sequence} disabled />

                  <TextInput label="Address" value={productData?.address} disabled />
                  <TextInput label="Location" value={productData?.location} disabled />
                  <TextInput label="Price" value={`Rp ${productData?.price.toLocaleString()}`} disabled />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Bedrooms" value={productData?.bedroom} disabled />
                  <TextInput label="Bathrooms" value={productData?.bathroom} disabled />
                  <TextInput label="Square Meters" value={productData?.square} disabled />
                </Grid.Col>
              </Grid>
              <TextInput label="Status" value={productData?.status} disabled />
              <TextInput label="Quantity" value={productData?.quantity} disabled />
            </Stack>
          </Paper>
        </ScrollArea>
      </Modal>
    </>
  );
};

export default GetProductModal;

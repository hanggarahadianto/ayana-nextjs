"use client";

import { Card, Text, Stack, Rating, Box, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { IconBuilding, IconHome, IconPencil, IconUser } from "@tabler/icons-react";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import BreathingActionIcon from "@/components/common/button/buttonAction";
// pastikan ada interface ini

interface TestimonyCardCarouselProps {
  testimonyList: ITestimonyItem[];
  openEditModal: (row: ITestimonyItem) => void;
  onDelete?: (id: string) => void; // optional
}

export const TestimonyCardCarousel = ({ testimonyList, openEditModal, onDelete }: TestimonyCardCarouselProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  let slideSize = "25%"; // 4 card per baris
  if (isMobile) slideSize = "100%";
  else if (isTablet) slideSize = "50%";

  return (
    <Carousel
      controlsOffset="xs"
      slideSize={slideSize}
      slideGap="md"
      align="start"
      withIndicators
      slidesToScroll={2}
      p={"60px"}
      controlSize={36}
    >
      {testimonyList.map((item) => (
        <Carousel.Slide key={item.customer_id}>
          <Card
            bg={"dark"}
            shadow="sm"
            padding="xl"
            radius="xl"
            withBorder
            style={{
              minHeight: 240,
              maxHeight: 290,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stack gap="xs" style={{ flexGrow: 1 }}>
              <Stack gap={"-1px"} mb={"12px"}>
                <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <IconUser size={20} />
                  <Text fw={600} truncate>
                    {item.customer?.name ?? "Customer"}
                  </Text>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <IconHome size={20} />
                  <Text fw={600} truncate>
                    {item.customer?.home.title}
                  </Text>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <IconBuilding size={20} />
                  <Text fw={600} truncate>
                    {item.customer?.product_unit}
                  </Text>
                </Box>
              </Stack>

              <Rating value={item.rating} readOnly size={"xl"} />
              <Text
                size="sm"
                c="dimmed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal", // penting untuk clamp
                  lineHeight: 1.5, // pastikan line-height stabil
                  height: "4.5em", // 3 baris x 1.5em line height
                }}
              >
                {item.note}
              </Text>
            </Stack>
            <Group justify="flex-end">
              <BreathingActionIcon onClick={() => openEditModal(item)} icon={<IconPencil size="1rem" />} size="2rem" />

              {onDelete && (
                <ButtonDeleteWithConfirmation
                  id={item.id}
                  onDelete={onDelete}
                  description="Apakah anda ingin menghapus Testimony ini ?"
                  size={2}
                />
              )}
            </Group>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

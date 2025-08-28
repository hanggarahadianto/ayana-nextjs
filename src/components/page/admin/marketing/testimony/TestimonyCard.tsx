"use client";

import { Card, Text, Stack, Rating, Box, Group, SimpleGrid, ActionIcon } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconBuilding, IconHome, IconPencil, IconUser, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useResponsiveLayout } from "@/styles/resposnsiveLayout/resposnvieLayout";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";
import BreathingActionIcon from "@/components/common/button/ButtonActionGo";

interface TestimonyCardCarouselProps {
  testimonyList: ITestimonyItem[];
  openEditModal: (row: ITestimonyItem) => void;
  onDelete?: (id: string) => void;
}

// helper untuk chunk array jadi n item per slide
const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

export const TestimonyCardCarousel = ({ testimonyList, openEditModal, onDelete }: TestimonyCardCarouselProps) => {
  const { isMobile, isTablet } = useResponsiveLayout();

  // pecah jadi 10 item per slide
  const slides = chunkArray(testimonyList, 10);

  // ukuran tombol carousel
  const buttonSize = isMobile ? 48 : isTablet ? 56 : 64;
  const iconSize = isMobile ? 22 : isTablet ? 26 : 30;

  return (
    <Carousel
      controlsOffset="lg"
      align="start"
      withIndicators
      loop
      slideGap="md"
      slideSize="100%"
      nextControlIcon={
        <ActionIcon
          component="div" // ⬅️ supaya bukan <button>
          size={buttonSize}
          radius="xl"
          variant="filled"
          color="green"
        >
          <IconChevronRight size={iconSize} />
        </ActionIcon>
      }
      previousControlIcon={
        <ActionIcon component="div" size={buttonSize} radius="xl" variant="filled" color="green">
          <IconChevronLeft size={iconSize} />
        </ActionIcon>
      }
      styles={{
        control: { border: "none", background: "transparent", boxShadow: "none" },
      }}
    >
      {slides.map((chunk, idx) => (
        <Carousel.Slide key={idx}>
          {/* grid responsif: mobile 1, tablet 2, desktop 5 */}
          <SimpleGrid cols={isMobile ? 1 : isTablet ? 2 : 5} spacing="md" verticalSpacing="md" p={"100px"}>
            {chunk.map((item) => (
              <Card
                key={item.id}
                bg="dark"
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
                  <Stack gap="-1px" mb="12px">
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

                  <Rating value={item.rating} readOnly size="xl" />
                  <Text
                    size="sm"
                    c="dimmed"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                      lineHeight: 1.5,
                      height: "4.5em",
                    }}
                  >
                    {item.note}
                  </Text>
                </Stack>
                <Group justify="flex-end">
                  <BreathingActionIcon onClick={() => openEditModal(item)} icon={<IconPencil size="1rem" />} size="2rem" />

                  {onDelete && (
                    <ButtonDeleteWithConfirmation
                      isLoading={false}
                      onDelete={() => onDelete(item.id)}
                      description="Apakah anda ingin menghapus Testimony ini ?"
                      size={2}
                    />
                  )}
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

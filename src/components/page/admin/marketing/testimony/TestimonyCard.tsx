"use client";

import { Card, Text, Stack, Rating, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";

interface TestimonyCardCarouselProps {
  testimonyList: ITestimonyItem[];
}

export const TestimonyCardCarousel = ({ testimonyList }: TestimonyCardCarouselProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  let slideSize = "25%"; // Default 3 per slide
  if (isMobile) slideSize = "100%";
  else if (isTablet) slideSize = "50%";

  return (
    <Carousel slideSize={slideSize} slideGap="md" align="start" withIndicators slidesToScroll={1}>
      {testimonyList.map((item) => (
        <Carousel.Slide key={item.customer_id}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="xs">
              <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <IconUser size={20} />
                <Text fw={600}>{item.customer.name ?? "Customer"}</Text>
              </Box>
              <Rating value={item.rating} readOnly />
              <Text size="sm" c="dimmed" lineClamp={4}>
                {item.note}
              </Text>
            </Stack>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

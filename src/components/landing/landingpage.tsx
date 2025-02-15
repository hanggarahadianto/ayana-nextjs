import React from "react";
import { AspectRatio, Badge, Container, Flex, Grid, Group, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import FloatingWhatsApp from "../product/floating-whatsapp";
import { useMediaQuery } from "@mantine/hooks";

const demoProps = {
  mt: 0,
};

const cards = [
  {
    image: "/images/home-card.jpg",
    alt: "STYLISH AFFORDABLE HOUSING",
    title: "STYLISH AFFORDABLE HOUSING",
    description: "Ayana presents affordable housing for you, fellow first homeowner",
  },
  {
    image: "/images/school.jpg",
    alt: "INTEGRATED ECOSYSTEM",
    title: "INTEGRATED ECOSYSTEM",
    description: "Enjoy the integrated ecosystem for a more effective and efficient life",
  },
  {
    image: "/images/happy.jpg",
    alt: "PLACE TO LIVE AND GROW",
    title: "PLACE TO LIVE AND GROW",
    description: "Plan your life for decades ahead with Cendana",
  },
];

const imageSize = { height: 400, width: 500 };
const imageSizeMobile = { height: 200, width: 200 };

const LandingPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <Container {...demoProps} fluid h={isMobile ? "240vh" : "160vh"} bg="#25492c">
        <FloatingWhatsApp />
        <AspectRatio ratio={1080 / 1080} maw={1800} mx="auto">
          <Image className="rounded-tl-3xl" src="/images/new-in.jpg" height={600} width={900} alt="" />
        </AspectRatio>

        {isMobile && (
          <Grid>
            <Stack p={40} ml={0}>
              <Image className="rounded-tl-3xl" src="/images/sublanding.png" height={300} width={300} alt="" />
            </Stack>

            <Stack p={20}>
              <Text fw={900} c="darksalmon" style={{ fontFamily: "Lora", fontSize: "3rem" }}>
                LIVABLE CITY
              </Text>

              <Text
                mt={0}
                fw={900}
                style={{ fontFamily: "Lora", fontSize: "2rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                Inside The City
              </Text>
              <Text size="xl" fw={300} variant="gradient" gradient={{ from: "white", to: "white", deg: 90 }}>
                True to our name, all we know do revolve around one simple, profound mission: To make your dream home a reality. This is to
                appreciate you hustlers, dreamers, and visionaries. Who dare to take responsibly the biggest leap of faith in life; to
                decide on a home of your own
              </Text>
            </Stack>
          </Grid>
        )}

        {!isMobile && (
          <Grid>
            <Grid.Col span={6}>
              <Stack p={40} ml={200}>
                <Image className="rounded-tl-3xl" src="/images/sublanding.png" height={300} width={300} alt="" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack mt={140}>
                <Text size="xl" fw={900} c="darksalmon" style={{ fontFamily: "Lora", fontSize: "5rem" }}>
                  LIVABLE CITY
                </Text>

                <Text
                  mt={-40}
                  fw={900}
                  style={{ fontFamily: "Lora", fontSize: "2rem" }}
                  variant="gradient"
                  gradient={{ from: "white", to: "white", deg: 90 }}
                >
                  Inside The City
                </Text>
                <Text size="xl" fw={300} variant="gradient" gradient={{ from: "white", to: "white", deg: 90 }}>
                  True to our name, all we know do revolve around one simple, profound mission: To make your dream home a reality. This is
                  to appreciate you hustlers, dreamers, and visionaries. Who dare to take responsibly the biggest leap of faith in life; to
                  decide on a home of your own
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        )}
        <Stack justify="center" align="center" mt={isMobile ? 30 : 120}>
          <Text
            variant="gradient"
            gradient={{ from: "white", to: "cyan", deg: 90 }}
            style={{ fontFamily: "Lora", fontSize: isMobile ? "3rem" : "6rem" }}
          >
            Why Ayana
          </Text>
        </Stack>
      </Container>

      {isMobile && (
        <SimpleGrid
          cols={1}
          style={{ backgroundColor: "#ece6dc" }}
          h="auto"
          // minHeight="100vh"
          spacing="xs"
          verticalSpacing="lg"
        >
          {cards.map((card, index) => (
            <Stack key={index} justify="start" align="center" style={{ flexGrow: 1, padding: "20px" }}>
              <Image
                src={card.image}
                alt={card.alt}
                height={imageSizeMobile.height}
                width={imageSizeMobile.width}
                style={{ borderRadius: "15px" }}
              />
              <Text size="xl" fw={900} style={{ fontFamily: "Lora", color: "black" }}>
                {card.title}
              </Text>
              <Text size="md" style={{ fontFamily: "Lora", color: "black" }}>
                {card.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      )}

      {!isMobile && (
        <SimpleGrid cols={1} style={{ backgroundColor: "#ece6dc", height: "28vh" }} spacing="lg">
          <Group justify="center" align="center" mt={-400}>
            {cards.map((card, index) => (
              <Grid key={index} p="md">
                <Grid.Col span={12}>
                  <Stack align="start">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      height={imageSize.height}
                      width={imageSize.width}
                      style={{ borderRadius: "15px" }}
                    />
                    <Text size="xl" fw={900} style={{ fontFamily: "Lora", color: "black" }}>
                      {card.title}
                    </Text>
                    <Text size="md" style={{ fontFamily: "Lora", color: "black" }}>
                      {card.description}
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            ))}
          </Group>
        </SimpleGrid>
      )}
    </div>
  );
};

export default LandingPage;

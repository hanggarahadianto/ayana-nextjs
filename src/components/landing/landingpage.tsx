import React, { useEffect, useMemo, useState } from "react";
import { AspectRatio, Badge, Container, Flex, Grid, Group, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import FloatingWhatsApp from "../product/floating-whatsapp";
import { useMediaQuery } from "@mantine/hooks";
import ProductPage from "app/product/page";
import Testimony from "./testimony";
import Footer from "./footer";

const LandingPage = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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

  return (
    <>
      <Container fluid p={isMobile ? "sm" : "xl"} bg="#25492c" pos="relative" h={isMobile ? "auto" : "full"}>
        <FloatingWhatsApp />
        {/* Hero Image */}
        <AspectRatio ratio={1} maw={1800} mx="auto">
          <Image src="/images/new-in.jpg" height={isMobile ? 300 : 500} width={isMobile ? 600 : 900} alt="Hero Image" />
        </AspectRatio>

        {/* Section: Text dan Image */}
        <Grid>
          <Grid.Col span={isMobile ? 11 : 6}>
            <Stack p={isMobile ? 20 : 40} ml={isMobile ? 0 : 200} align={isMobile ? "center" : "flex-start"}>
              <Image
                className="rounded-tl-3xl"
                src="/images/sublanding.png"
                height={isMobile ? 200 : 300}
                width={isMobile ? 200 : 300}
                alt=""
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={isMobile ? 13 : 6}>
            <Stack mt={isMobile ? 40 : 140} align={isMobile ? "center" : "flex-start"}>
              <Text
                size={isMobile ? "lg" : "xl"}
                fw={900}
                c="darksalmon"
                style={{ fontFamily: "Lora", fontSize: isMobile ? "3rem" : "5rem" }}
              >
                LIVABLE CITY
              </Text>

              <Text
                mt={isMobile ? -20 : -40}
                fw={900}
                style={{ fontFamily: "Lora", fontSize: isMobile ? "1.5rem" : "2rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                Inside The City
              </Text>

              <Text size={isMobile ? "md" : "xl"} fw={300} variant="gradient" gradient={{ from: "white", to: "white", deg: 90 }}>
                True to our name, all we know do revolve around one simple, profound mission: To make your dream home a reality. This is to
                appreciate you hustlers, dreamers, and visionaries. Who dare to take responsibly the biggest leap of faith in life; to
                decide on a home of your own.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Section: Why Ayana */}
        <Stack align="center" mt={isMobile ? 10 : 50} p={isMobile ? 5 : 20}>
          <Text
            variant="gradient"
            gradient={{ from: "white", to: "cyan", deg: 90 }}
            style={{ fontFamily: "Lora", fontSize: isMobile ? "2rem" : "4rem", textAlign: "center" }}
          >
            Why Ayana
          </Text>
        </Stack>

        <Stack>
          <Flex
            direction={isMobile ? "column" : "row"}
            wrap="wrap"
            justify="center"
            align="center"
            gap={isMobile ? "sm" : "xl"}
            style={{
              backgroundColor: "#ece6dc",
              padding: isMobile ? "0.5rem" : "4rem",
            }}
          >
            {cards.map((card, index) => (
              <Stack
                key={index}
                align="center"
                gap={isMobile ? "sm" : "xl"}
                p={isMobile ? "sm" : "lg"}
                style={{
                  maxWidth: isMobile ? 200 : 400,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  height={isMobile ? 120 : 260}
                  width={isMobile ? 180 : 350}
                  style={{ borderRadius: "10px" }}
                />
                <Text
                  size={isMobile ? "md" : "xl"}
                  fw={900}
                  style={{
                    fontFamily: "Lora",
                    color: "black",
                    textAlign: "center",
                    lineHeight: isMobile ? "1.2" : "1.5",
                  }}
                >
                  {card.title}
                </Text>
                <Text
                  size={isMobile ? "sm" : "md"}
                  style={{
                    fontFamily: "Lora",
                    color: "black",
                    textAlign: "center",
                    padding: isMobile ? "0.3rem" : "1rem",
                  }}
                >
                  {card.description}
                </Text>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Container>
      <ProductPage />
      <Stack mt={isMobile ? 10 : 10}>
        <Testimony />
      </Stack>
      <Stack>
        <Footer />
      </Stack>
    </>
  );
};

export default LandingPage;

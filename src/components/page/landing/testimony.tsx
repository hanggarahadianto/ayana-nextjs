"use client";

import React from "react";
import { Paper, Text, Group, Button, Image, Grid, Card, Box, Stack, SimpleGrid } from "@mantine/core";
import { FaQuoteLeft } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "@mantine/hooks";

const Testimony = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMid = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
  const isWide = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <Grid style={{ height: "100%" }} gutter={isMobile ? 20 : 45}>
        <Grid.Col span={isMobile ? 12 : 6} style={{ backgroundColor: "#486245", padding: isMobile ? "10vw" : "12vw" }}>
          <Stack align="start" gap={10}>
            <Text c="white" style={{ fontFamily: "Lora", fontSize: isMobile ? "8vw" : "4vw" }}>
              What They Say of
            </Text>
            <Text fw={800} c="#a67d67" style={{ fontFamily: "Montserrat", fontSize: isMobile ? "6vw" : "3vw" }}>
              AYANA HOME
            </Text>
            <Text c="white" style={{ fontFamily: "Lora", fontSize: isMobile ? "3.5vw" : "1.5vw" }}>
              Find out more about Cendana Homes from the customers and residents.
            </Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={isMobile ? 12 : 6} style={{ backgroundColor: "#22492a", padding: isMobile ? "5vw" : "5vw" }}>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            // w={isMobile ? "100%" : isWide ? "60%" : "120%"}
            style={{ backgroundColor: "#e1d9c9", margin: "auto" }}
          >
            <Group justify="space-between" mt="md" mb="xs" p={40}>
              <FaQuoteLeft size={isMobile ? 30 : 40} color="#486245" />
              <Text style={{ fontFamily: "Lora", fontSize: isMobile ? "3.5vw" : "1.2rem", color: "black" }}>
                Tinggal di Ayana sangat nyaman, dari udara yang sejuk, fasilitas lengkap, dan lokasi strategis.
              </Text>
            </Group>
            <Group mt={20} align="center">
              <Image src="/images/people.png" height={isMobile ? 50 : 70} width={isMobile ? 50 : 70} alt="User" radius={100} />
              <Stack gap={0}>
                <Text fw={800} c="#f05a36" style={{ fontFamily: "Montserrat", fontSize: isMobile ? "4vw" : "1.5rem" }}>
                  Briyan Ongko Wijaya
                </Text>
                <Text fw={500} c={"black"} style={{ fontSize: isMobile ? "3vw" : "1rem" }}>
                  Ayana Resident
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Marquee & Footer */}
      {/* </Paper> */}
      <SimpleGrid style={{ position: "relative", width: "100%", height: "auto", overflow: "hidden" }} mt={isMobile ? -10 : 0}>
        <Image src="/images/footer.jpg" height={isMobile ? 200 : 600} width="100%" alt="Footer" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Marquee speed={100} style={{ width: "100%" }}>
            <Text fw={900} c="white" style={{ fontFamily: "Montserrat", fontSize: isMobile ? "6vw" : "5vw" }}>
              INTERESTED IN OUR HOMES
            </Text>
          </Marquee>
          <Button mt={80} bg="orange" h={50} radius="md">
            <Text fw={900} c="white" style={{ fontFamily: "Montserrat", fontSize: isMobile ? "4vw" : "1.2rem" }}>
              Contact Us
            </Text>
          </Button>
        </div>
      </SimpleGrid>
    </>
  );
};

export default Testimony;

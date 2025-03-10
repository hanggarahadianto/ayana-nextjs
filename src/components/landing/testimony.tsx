"use client"; // Add this at the top of your component

import React, { useEffect, useState } from "react";
import { Paper, Text, Group, Button, Flex, Image, Grid, Card, Box, Stack } from "@mantine/core";
import { FaQuoteLeft } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "@mantine/hooks";

const Testimony = () => {
  // const [isMobile, setIsMobile] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMid = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
  const isWide = useMediaQuery("(min-width: 1280px)");

  // useEffect(() => {
  //   setIsMobile(window.innerWidth <= 768);
  // }, []);

  return (
    <Paper h={isMobile ? "auto" : "60vh"} mb={isMobile ? 200 : 400}>
      <Grid style={{ height: "100%" }}>
        {/* Left Side */}
        <Grid.Col span={isMobile ? 12 : 6} bg={"#486245"} h={isMobile ? "auto" : "85vh"}>
          <Stack ml={isMobile ? 20 : 80} align="start" justify="start" mt={isMobile ? 60 : 120} gap={1}>
            <Text c="white" style={{ fontFamily: "Lora", fontSize: isMobile ? "3rem" : "5rem" }}>
              What They Say of
            </Text>
            <Text mt={-10} fw={800} c="#a67d67" style={{ fontFamily: "Montserrat", fontSize: isMobile ? "2.5rem" : "4rem" }}>
              AYANA HOME
            </Text>
            <Text mt={10} fw={100} c="white" style={{ fontFamily: "Lora", fontSize: isMobile ? "1rem" : "1.5rem" }} mb={60}>
              Find out more about Cendana Homes from the customers and residents.
            </Text>
          </Stack>
        </Grid.Col>

        {/* Right Side */}
        <Grid.Col span={isMobile ? 12 : 6} style={{ backgroundColor: "#22492a" }} h={isMobile ? "auto" : "auto"}>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            mt={isMobile ? 30 : 90}
            w={isMobile ? "90%" : isWide ? 700 : 400}
            ml={isMobile ? "auto" : 80}
            mr={isMobile ? "auto" : 0}
            style={{ backgroundColor: "#e1d9c9" }}
            mb={120}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <FaQuoteLeft size={40} color="#486245" />
              <Text fw={500} size="xl" mt={20} style={{ fontFamily: "Lora", fontSize: "1.2rem", color: "black" }}>
                Tinggal di Ayana sangat nyaman, dari udara yang sejuk, fasilitas yang lengkap, kemana-mana dekat, dan pastinya rumahnya
                tidak ada masalah.
              </Text>
            </Group>
            <Flex mt={20} p={10} gap={20}>
              <Box
                style={{
                  borderRadius: "50%",
                  backgroundColor: "dark",
                  width: 70,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/images/people.png" height={70} width={70} alt="User" style={{ borderRadius: "50%" }} />
              </Box>
              <Stack>
                <Text fw={800} c="#f05a36" style={{ fontFamily: "Montserrat", fontSize: "1.5rem" }}>
                  Briyan Ongko Wijaya
                </Text>
                <Text mt={-10} fw={500} c={"black"}>
                  Ayana Resident
                </Text>
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Marquee & Footer */}
      <div style={{ position: "relative", width: "100%", height: isMobile ? "80px" : "400px" }}>
        <Image src="/images/footer.jpg" height={isMobile ? 300 : 400} width={"100%"} alt="Footer" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          <Marquee speed={100}>
            <Group mt={50}>
              <Text mr={50} fw={900} c={"white"} style={{ fontFamily: "Montserrat", fontSize: isMobile ? "4rem" : "7rem" }}>
                INTERESTED IN OUR HOMES
              </Text>
              <Text mr={50} fw={900} c={"white"} style={{ fontFamily: "Montserrat", fontSize: isMobile ? "4rem" : "7rem" }}>
                INTERESTED IN OUR HOMES
              </Text>
            </Group>
          </Marquee>
          <Stack align="center" justify="center" mt={20}>
            <Button w={160} bg={"orange"} h={40}>
              <Text p={10} fw={900} c={"white"} style={{ fontFamily: "Montserrat", fontSize: "1.2rem" }}>
                Contact Us
              </Text>
            </Button>
          </Stack>
        </div>
      </div>
    </Paper>
  );
};

export default Testimony;

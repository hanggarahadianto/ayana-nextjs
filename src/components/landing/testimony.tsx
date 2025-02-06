"use client";
import React from "react";
import { Paper, Text, Group, Button, Flex, Image, Grid, Card, Box, Stack } from "@mantine/core";
import { FaQuoteLeft } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Testimony = () => {
  return (
    <Paper h={"60vh"} mb={400}>
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={4} mt={0} style={{ backgroundColor: "#22492a" }} h={"85vh"}>
          <Card shadow="sm" radius="md" withBorder mt={90} w={600} ml={200} style={{ backgroundColor: "#e1d9c9" }}>
            <Group justify="space-between" mt="md" mb="xs">
              <FaQuoteLeft size={60} color="#486245" />
              <Text fw={500} size="xl" mt={40} style={{ fontFamily: "Lora", fontSize: "1.5rem", color: "black" }}>
                Tinggal di Ayana sangat nyaman, dari udara yang sejuk, fasilitas yang lengkap, kemana mana dekat, dan pastinya rumahnya
                tidak ada masalah
              </Text>
            </Group>
            <Flex mt={40} p={10} gap={40}>
              <Box
                style={{
                  borderRadius: "300px",
                  backgroundColor: "dark",
                  width: 90,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/images/people.png" height={80} width={90} alt="" style={{ borderRadius: "1000px" }} />
              </Box>
              <Stack>
                <Text fw={800} c="#f05a36" style={{ fontFamily: "Montserrat", fontSize: "2rem" }}>
                  Briyan Ongko Wijaya
                </Text>
                <Text mt={-20} fw={500} c={"black"}>
                  Ayana Resident
                </Text>
              </Stack>
            </Flex>
          </Card>
        </Grid.Col>
        <Grid.Col span={8} bg={"#486245"} h={"85vh"}>
          <Stack ml={300} align="start" justify="center" mt={120} gap={1}>
            <Text c="white" style={{ fontFamily: "Lora", fontSize: "5rem" }}>
              What They Say of
            </Text>
            <Text mt={-30} fw={800} c="#a67d67" style={{ fontFamily: "Montserrat", fontSize: "4rem" }}>
              AYANA HOME
            </Text>
            <Text mt={10} fw={100} c="white" style={{ fontFamily: "Lora", fontSize: "1.5rem" }}>
              Find out more about Cendana Homes from the customers and residents.
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>

      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image src="/images/footer.jpg" height={400} width={90} alt="" />
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
            <Group mt={80}>
              <Text mr={120} fw={900} c={"white"} style={{ fontFamily: "Montserrat", fontSize: "7rem" }}>
                INTERESTED IN OUR HOMES
              </Text>
              <Text mr={120} fw={900} c={"white"} style={{ fontFamily: "Montserrat", fontSize: "7rem" }}>
                INTERESTED IN OUR HOMES
              </Text>
            </Group>
          </Marquee>
          <Stack align="center" justify="center" mt={40}>
            <Button w={200} bg={"orange"} h={40}>
              <Text p={20} mr={120} fw={900} c={"white"} style={{ fontFamily: "Montserrat", fontSize: "1.5rem" }}>
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

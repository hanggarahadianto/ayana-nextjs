"use client";
import React from "react";
import {
  Text,
  Grid,
  SimpleGrid,
  Stack,
  Divider,
  Button,
  Flex,
  Box,
} from "@mantine/core";
// import { Link } from "react-router-dom";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    // <SimpleGrid p="md" h={490} bg={"white"}>
    <SimpleGrid p="md" h={490} bg={"#363a3d"}>
      <Grid>
        <Grid.Col span={4}>
          <Stack p={40}>
            <Image
              className="rounded-tl-3xl"
              src="/images/ayana.png"
              height={200}
              width={200}
              alt=""
              style={{ borderRadius: "15px" }}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack p={20}>
            <Text
              mb={30}
              fw={700}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "2rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              Sitemap
            </Text>
            <Text
              fw={500}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              Tetimony
            </Text>
            <Text
              fw={500}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              News & Updated
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack p={20}>
            <Text
              mb={30}
              fw={700}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "2rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              Contact Us
            </Text>
            <Text
              fw={500}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              +62 8749973043
            </Text>
            <Text
              fw={700}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              AYANA@GMAIL.COM
            </Text>
          </Stack>
          <Stack p={20}>
            <Text
              fw={700}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "2rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              Connect With Us
            </Text>

            <Flex gap={10}>
              <Button
                style={{ borderRadius: "300px", padding: 0 }}
                color="teal"
                w={60}
                h={60}
              >
                <Box
                  style={{
                    borderRadius: "200px",
                    backgroundColor: "teal",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaInstagram style={{ fontSize: "40px" }} />
                </Box>
              </Button>
              <Button
                style={{ borderRadius: "300px", padding: 0 }}
                color="red"
                w={60}
                h={60}
              >
                <Box
                  style={{
                    borderRadius: "200px",
                    backgroundColor: "red",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaYoutube style={{ fontSize: "40px" }} />
                </Box>
              </Button>
              <Button
                style={{ borderRadius: "300px", padding: 0 }}
                color="dark"
                w={60}
                h={60}
              >
                <Box
                  style={{
                    borderRadius: "200px",
                    backgroundColor: "dark",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaTiktok style={{ fontSize: "40px" }} />
                </Box>
              </Button>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
      <Divider my="md" variant="dashed" />
      <Text ml={30} c="white">
        © 2025 Ayana Homes All Rights Reserved.
      </Text>
    </SimpleGrid>
  );
};

export default Footer;

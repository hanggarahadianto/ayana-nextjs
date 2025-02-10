"use client";
import React from "react";
import { Text, Grid, SimpleGrid, Stack, Divider, Button, Flex, Box, Group } from "@mantine/core";
// import { Link } from "react-router-dom";
import Image from "next/image";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLocationArrow,
  FaExclamationCircle,
  FaEnvelope,
  FaFacebookMessenger,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

const message = encodeURIComponent(
  "Halo! Saya menghubungi Anda melalui website dan tertarik dengan rumah yang ditawarkan. Bisa berikan informasi lebih lanjut? Jika ada katalog atau daftar harga, saya ingin melihatnya. Apakah ada promo saat ini? Saya tunggu responnya. Terima kasih! 😊"
);

const Footer = () => {
  return (
    // <SimpleGrid p="md" h={490} bg={"white"}>
    <SimpleGrid p="md" h={520} bg={"#363a3d"}>
      <Grid>
        <Grid.Col span={4}>
          <Stack p={20}>
            <Image className="rounded-tl-3xl" src="/images/ayana.png" height={280} width={280} alt="" style={{ borderRadius: "15px" }} />
            <Group>
              <FaLocationArrow color="white" />
              <Text
                ml={10}
                fw={500}
                style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                Jalan Pujowiyoto No 7 Purbalingga Wetan
              </Text>
            </Group>
            <Group>
              <FaEnvelope color="white" />
              <Text
                ml={10}
                fw={500}
                style={{ fontFamily: "GalanoGrotesque", fontSize: "1rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                ayanagroup99@gmail.com
              </Text>
            </Group>
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
              Testimony
            </Text>
            <Link href="/banking-partners" passHref style={{ textDecoration: "none" }}>
              <Text
                fw={500}
                style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                Bank Partners
              </Text>
            </Link>
            <Link href="/internal/sidebar/project" passHref style={{ textDecoration: "none" }}>
              <Text
                fw={500}
                style={{ fontFamily: "GalanoGrotesque", fontSize: "1.25rem" }}
                variant="gradient"
                gradient={{ from: "white", to: "white", deg: 90 }}
              >
                Internal
              </Text>
            </Link>
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
              fw={700}
              style={{ fontFamily: "GalanoGrotesque", fontSize: "2rem" }}
              variant="gradient"
              gradient={{ from: "white", to: "white", deg: 90 }}
            >
              Contact Us
            </Text>

            <Group>
              <Button
                w={200}
                h={60}
                component="a"
                href={`https://wa.me/62895421711315?text=${message}`}
                target="_blank"
                variant="filled"
                color="green"
                leftSection={<FaWhatsapp />}
              >
                0895-4217-11315
              </Button>
            </Group>
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
              <Button style={{ borderRadius: "300px", padding: 0 }} color="teal" w={60} h={60}>
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
              <Button style={{ borderRadius: "300px", padding: 0 }} color="red" w={60} h={60}>
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
              <Button style={{ borderRadius: "300px", padding: 0 }} color="dark" w={60} h={60}>
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
      <Divider variant="dashed" />
      <Text ml={30} c="white">
        © 2025 Ayana Homes All Rights Reserved.
      </Text>
    </SimpleGrid>
  );
};

export default Footer;

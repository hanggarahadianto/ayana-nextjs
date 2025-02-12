"use client";
import React from "react";
import { Text, Grid, SimpleGrid, Stack, Divider, Button, Flex, Box, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTiktok, FaLocationArrow, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const message = encodeURIComponent(
  "Halo! Saya menghubungi Anda melalui website dan tertarik dengan rumah yang ditawarkan. Bisa berikan informasi lebih lanjut? Jika ada katalog atau daftar harga, saya ingin melihatnya. Apakah ada promo saat ini? Saya tunggu responnya. Terima kasih! 😊"
);

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <SimpleGrid p="md" bg={"#363a3d"}>
      <Grid gutter={isMobile ? "md" : "xl"}>
        {/* Logo & Address Section */}
        <Grid.Col span={isMobile ? 12 : 4}>
          <Stack align={isMobile ? "center" : "flex-start"} gap="md">
            <Image src="/images/ayana.png" height={200} width={200} alt="Ayana Logo" style={{ borderRadius: "15px" }} />
            <Group>
              <FaLocationArrow color="white" />
              <Text c="white" size={isMobile ? "sm" : "md"}>
                Jalan Pujowiyoto No 7 Purbalingga Wetan
              </Text>
            </Group>
            <Group>
              <FaEnvelope color="white" />
              <Text c="white" size={isMobile ? "sm" : "md"}>
                ayanagroup99@gmail.com
              </Text>
            </Group>
          </Stack>
        </Grid.Col>

        {/* Sitemap Section */}
        <Grid.Col span={isMobile ? 12 : 4}>
          <Stack align={isMobile ? "center" : "flex-start"} gap="md">
            <Text fw={700} size={isMobile ? "lg" : "xl"} c="white">
              Sitemap
            </Text>
            <Text c="white" size={isMobile ? "sm" : "md"}>
              Testimony
            </Text>
            <Link href="/banking-partners" passHref style={{ textDecoration: "none" }}>
              <Text c="white" size={isMobile ? "sm" : "md"}>
                Bank Partners
              </Text>
            </Link>
            <Link href="/internal/sidebar/project" passHref style={{ textDecoration: "none" }}>
              <Text c="white" size={isMobile ? "sm" : "md"}>
                Internal
              </Text>
            </Link>
            <Text c="white" size={isMobile ? "sm" : "md"}>
              News & Updates
            </Text>
          </Stack>
        </Grid.Col>

        {/* Contact & Socials */}
        <Grid.Col span={isMobile ? 12 : 4}>
          <Stack align={isMobile ? "center" : "flex-start"} gap="md">
            <Text fw={700} size={isMobile ? "lg" : "xl"} c="white">
              Contact Us
            </Text>
            <Button
              component="a"
              href={`https://wa.me/62895421711315?text=${message}`}
              target="_blank"
              variant="filled"
              color="green"
              leftSection={<FaWhatsapp />}
              w={isMobile ? 250 : 200}
              h={50}
            >
              0895-4217-11315
            </Button>

            <Text fw={700} size={isMobile ? "lg" : "xl"} c="white">
              Connect With Us
            </Text>
            <Flex gap="md" justify={isMobile ? "center" : "flex-start"}>
              <Button color="teal" radius="xl" w={50} h={50}>
                <FaInstagram size={30} />
              </Button>
              <Button color="red" radius="xl" w={50} h={50}>
                <FaYoutube size={30} />
              </Button>
              <Button color="dark" radius="xl" w={50} h={50}>
                <FaTiktok size={30} />
              </Button>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider my="md" variant="dashed" />
      <Text ta="center" c="white">
        © 2025 Ayana Homes. All Rights Reserved.
      </Text>
    </SimpleGrid>
  );
};

export default Footer;

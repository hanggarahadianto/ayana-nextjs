"use client";

import { Flex, Stack, Image, Text, Group, SimpleGrid } from "@mantine/core";
import Link from "next/link";

export const Navbar = () => {
  return (
    <SimpleGrid
      mb={-16}
      bg="#beab96"
      p="md"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <Flex justify="space-between" align="center">
        <Link href={"/home"} passHref>
          <Image
            ml={12}
            className="rounded-tl-3xl"
            src="/images/ayana.png"
            height={60}
            width={60}
            alt=""
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link href={"/about"} passHref style={{ textDecoration: "none" }}>
          <Text mr={20} c={"black"}>
            Tentang Kami
          </Text>
        </Link>
      </Flex>
    </SimpleGrid>
  );
};

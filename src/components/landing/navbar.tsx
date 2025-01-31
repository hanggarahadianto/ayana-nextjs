"use client";

import {
  Flex,
  Stack,
  Image,
  Text,
  Group,
  SimpleGrid,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";

export const Navbar = () => {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <SimpleGrid
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
            height={28}
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
        <Group>
          <Button onClick={() => setColorScheme("light")}>Light</Button>
          <Button onClick={() => setColorScheme("dark")}>Dark</Button>
        </Group>
      </Flex>
    </SimpleGrid>
  );
};

"use client";

import { Flex, Image, Text, Group, SimpleGrid, Switch, useMantineColorScheme, createTheme, Stack } from "@mantine/core";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";

export const Navbar = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SimpleGrid bg={isDark ? "#1a1b1e" : "#beab96"} p="md" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Flex justify="space-between" align="center">
        <Stack>
          <Link href={"/home"} passHref>
            <Image
              ml={12}
              className="rounded-tl-3xl"
              src="/images/ayana.png"
              height={28}
              width={60}
              alt="Logo"
              style={{ borderRadius: "15px" }}
            />
          </Link>
        </Stack>

        <Group gap={20}>
          <Link href={"/about"} passHref style={{ textDecoration: "none" }}>
            <Text mr={20} c={isDark ? "white" : "black"}>
              Tentang Kami
            </Text>
          </Link>
          <Group mr={20}>
            <Switch
              checked={isDark}
              onChange={(event) => setColorScheme(event.currentTarget.checked ? "dark" : "light")}
              size="lg"
              onLabel={<FiSun size={16} />}
              offLabel={<FiMoon size={16} />}
              color="yellow"
            />
          </Group>
        </Group>
      </Flex>
    </SimpleGrid>
  );
};

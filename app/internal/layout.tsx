"use client";

import { Navbar } from "@/src/components/landing/navbar";
import {
  AppShell,
  Burger,
  Container,
  NavLink,
  rem,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { FaTasks, FaProjectDiagram, FaUser, FaCog } from "react-icons/fa"; // Added icons for better visualization

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme(); // For dark mode toggle
  const [opened, { toggle }] = useDisclosure();
  const tablet_match = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Navbar />
      <SimpleGrid>
        <AppShell
          padding="md"
          layout="alt"
          header={{ height: 60 }}
          navbar={{
            width: 220,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
        >
          <AppShell.Header
            style={{
              height: rem(60),
              boxShadow: tablet_match ? theme.shadows.md : theme.shadows.sm,
              backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0], // Background for dark mode
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "space-between",
                padding: "0 20px",
              }}
            >
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={3} style={{ marginLeft: "20px", color: colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[9] }}>
                Search
              </Title>
            </div>
          </AppShell.Header>

          <AppShell.Navbar p="xl" mt={40}>
            <Stack mt={40}>
              <NavLink
                component={Link}
                href="/internal/sidebar/task"
                style={{
                  color: colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[9], // Adjust text color based on theme
                  transition: "background-color 0.3s ease", // Smooth transition for hover
                }}
                label="Task"
                leftSection={<FaTasks />}
                active={false}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.blue[6])} // Hover effect
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")} // Reset hover
              />
              <NavLink
                component={Link}
                href="/internal/sidebar/project"
                style={{
                  color: colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[9],
                  transition: "background-color 0.3s ease",
                }}
                label="Project"
                leftSection={<FaProjectDiagram />}
                active={false}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.blue[6])}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              />
              <NavLink
                component={Link}
                href="/internal/sidebar/profile"
                style={{
                  color: colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[9],
                  transition: "background-color 0.3s ease",
                }}
                label="Profile"
                leftSection={<FaUser />}
                active={false}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.blue[6])}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              />
              <NavLink
                component={Link}
                href="/internal/sidebar/setting"
                style={{
                  color: colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[9],
                  transition: "background-color 0.3s ease",
                }}
                label="Setting"
                leftSection={<FaCog />}
                active={false}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.blue[6])}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              />
            </Stack>
          </AppShell.Navbar>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </SimpleGrid>
    </>
  );
}

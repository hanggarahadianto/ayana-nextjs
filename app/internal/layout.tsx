"use client";

import { useEffect, useState } from "react";
import Navbar from "@/src/components/landing/navbar";
import { AppShell, Burger, NavLink, rem, SimpleGrid, Stack, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { FaTasks, FaProjectDiagram, FaUser, FaCog } from "react-icons/fa";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const [tabletMatch, setTabletMatch] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTabletMatch(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch

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
          // style={{
          //   height: rem(60),
          //   boxShadow: tabletMatch ? theme.shadows.md : theme.shadows.sm,
          //   backgroundColor: theme.colors.gray[0],
          // }}
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
              <Title order={3} style={{ marginLeft: "20px", color: theme.colors.dark[9] }}>
                Search
              </Title>
            </div>
          </AppShell.Header>

          <AppShell.Navbar p="xl" mt={40}>
            <Stack mt={40}>
              <NavLink component={Link} href="/internal/sidebar/task" label="Task" leftSection={<FaTasks />} />
              <NavLink component={Link} href="/internal/sidebar/project" label="Project" leftSection={<FaProjectDiagram />} />
              <NavLink component={Link} href="/internal/sidebar/profile" label="Profile" leftSection={<FaUser />} />
              <NavLink component={Link} href="/internal/sidebar/setting" label="Setting" leftSection={<FaCog />} />
            </Stack>
          </AppShell.Navbar>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </SimpleGrid>
    </>
  );
}

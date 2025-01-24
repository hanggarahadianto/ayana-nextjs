// app/internal/layout.tsx
"use client";

// import HeaderNav from "@/src/components/HeaderNav";
import {
  AppShell,
  Burger,
  Container,
  NavLink,
  rem,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const tablet_match = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell
      padding="md"
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header
        style={{
          height: rem(60),
          boxShadow: tablet_match ? theme.shadows.md : theme.shadows.sm,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text p={20}>Seach</Text>
        </div>

        <Container fluid py="sm" px="lg">
          {/* <HeaderNav
          // mobileOpened={mobileOpened}
          // toggleMobile={toggleMobile}
          // sidebarState={sidebarState}
          // onSidebarStateChange={toggleSidebarState}
          /> */}
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="xl">
        <Stack>
          <Link
            href="/internal/sidebar/task"
            style={{ textDecoration: "none", color: theme.colors.dark[9] }}
          >
            Task
          </Link>
          <Link
            href="/internal/sidebar/project"
            style={{ textDecoration: "none", color: theme.colors.dark[9] }}
          >
            Project
          </Link>
          <Link
            href="/internal/sidebar/profile"
            style={{ textDecoration: "none", color: theme.colors.dark[9] }}
          >
            Profile
          </Link>
          <Link
            href="/internal/sidebar/setting"
            style={{ textDecoration: "none", color: theme.colors.dark[9] }}
          >
            Setting
          </Link>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

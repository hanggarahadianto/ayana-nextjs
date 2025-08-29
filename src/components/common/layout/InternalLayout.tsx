"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { AppShell, Burger, NavLink, Stack, rem, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Navbar from "@/components/page/landing/navbar";
import { mainMenuItems, userMenuItem } from "@/constants/navigation";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { useResponsiveLayout } from "@/styles/resposnsiveLayout/resposnvieLayout";
import LoadingGlobal from "@/styles/loading/loading-global";
import { useCompanyStore } from "@/constants/company-store";

export default function InternalLayoutClient({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [isClosed, setIsClosed] = useState(false);
  const [isToggleTriggered, setIsToggleTriggered] = useState(false);

  const pathname = usePathname();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { isMobile, isTablet } = useResponsiveLayout();

  const { user, isLoadingUser } = useLoggedInUser();
  const activeCompany = useCompanyStore((s) => s.activeTab);

  const currentCompany = useMemo(() => {
    if (!activeCompany) return null;

    if (Array.isArray(activeCompany)) {
      return activeCompany[0]; // ambil pertama aja
    }

    return activeCompany;
  }, [activeCompany]);

  // 🔹 Filter menu berdasarkan kondisi + sortedCompany
  const filteredMenuItems = useMemo(() => {
    if (user?.username === "superadmin") {
      return mainMenuItems;
    }
    return mainMenuItems.filter((item) => !item.condition || item.condition(currentCompany));
  }, [currentCompany, user]);

  if (isLoadingUser) {
    return <LoadingGlobal visible />;
  }
  if (!user) {
    return null;
  }

  const isClosedOrMobile = isClosed || isMobile || isTablet;
  const computedWidth = isToggleTriggered ? (isClosed ? 105 : 200) : isClosedOrMobile ? 105 : 200;

  const toggleNav = () => {
    setIsToggleTriggered(true);
    setIsClosed((prev) => !prev);
  };

  const navLinkStyles = {
    root: {
      color: "white",
      fontWeight: "bold",
      borderRadius: rem(8),
      padding: rem(12),
      transition: "background-color 0.3s ease, transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)",
      },
    },
    label: {
      whiteSpace: "nowrap",
    },
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: computedWidth,
        breakpoint: "xs",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{
        background: isDark ? "linear-gradient(135deg, #121212, #1e1e1e)" : "linear-gradient(135deg, #2e7d32, #2a5298)",
        color: isDark ? theme.colors.gray[3] : "white",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Navbar />
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar
        pt="xl"
        p="xl"
        style={{
          background: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(90px)",
          overflowY: "auto",
        }}
      >
        <Stack justify="space-between" style={{ height: "100%" }}>
          <Stack gap="md">
            {/* Toggle button */}
            <Stack justify="flex-end" align="flex-end" style={{ width: "100%" }}>
              <button
                onClick={toggleNav}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                {isClosedOrMobile ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
              </button>
            </Stack>

            {/* MENU LIST */}
            <AnimatePresence>
              {filteredMenuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink
                    component={Link}
                    href={item.href}
                    label={!isClosed ? item.label : undefined}
                    leftSection={item.icon}
                    active={pathname === item.href}
                    styles={navLinkStyles}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>

          {/* USER MENU */}
          <NavLink
            component={Link}
            href={userMenuItem.href}
            label={!isClosed ? userMenuItem.label : undefined}
            leftSection={userMenuItem.icon}
            active={pathname === userMenuItem.href}
            styles={{
              ...navLinkStyles,
              root: { ...navLinkStyles.root, marginBottom: "12px" },
            }}
          />
        </Stack>
      </AppShell.Navbar>

      {/* MAIN */}
      <AppShell.Main style={{ marginTop: 20 }}>{children}</AppShell.Main>
    </AppShell>
  );
}

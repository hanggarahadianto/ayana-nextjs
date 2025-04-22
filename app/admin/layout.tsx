"use client";

import Navbar from "@/components/page/landing/navbar";
import { menuItems } from "@/constants/navigation";
import { AppShell, Burger, NavLink, rem, Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Cookies from "js-cookie";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  useEffect(() => {
    setIsMounted(true);

    // Check authentication token from cookies
    const token = Cookies.get("token");

    if (!token) {
      router.push("/home");
    }
  }, []); // Router tidak perlu dalam dependency array

  if (!isMounted) return null;

  const isDark = colorScheme === "dark";

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: isCollapsed ? 90 : 200, // Adjust width based on collapse state
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        style={{
          background: isDark ? "linear-gradient(135deg, #121212, #1e1e1e)" : "linear-gradient(135deg, #2e7d32, #2a5298)",
          minHeight: "100vh",
          color: isDark ? theme.colors.gray[3] : "white",
        }}
        padding="md"
      >
        <AppShell.Header>
          <Navbar />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </AppShell.Header>

        <AppShell.Navbar
          pt="xl"
          p="xl"
          style={{
            background: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(90px)",
            overflowY: "auto", // ✅ Tambahkan ini
            maxHeight: "100vh", // ✅ Pastikan tinggi tidak melebihi viewport
          }}
        >
          <Stack mt={10} gap="md">
            <Stack justify="flex-end" align="flex-end" style={{ width: "100%" }}>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  // marginBottom: rem(2),

                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
                {/* {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />} */}
              </button>
            </Stack>

            <AnimatePresence>
              {menuItems.map((item: any, index: any) => (
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
                    label={!isCollapsed ? item.label : undefined} // Show label only if not collapsed
                    leftSection={item.icon}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: rem(8),
                      padding: rem(12),
                      transition: "background-color 0.3s ease, transform 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"; // Zoom out on leave
                      e.currentTarget.style.background = "transparent";
                    }}
                  ></NavLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main mt={20}>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}

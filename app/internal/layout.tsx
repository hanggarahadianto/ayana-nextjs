"use client";

import { useState, useEffect } from "react";
import { AppShell, NavLink, SimpleGrid, Stack, useMantineTheme, rem, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { FaTasks, FaProjectDiagram, FaUser, FaCog, FaHome, FaNewspaper, FaShoppingBag, FaIdeal } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import router from "next/router";
import Navbar from "@/components/landing/navbar";
export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check authentication token from cookies
    const token = Cookies.get("token"); // Replace "auth_token" with your actual cookie name

    if (!token) {
      router.push("/auth/login"); // Redirect to login page if token is missing
    }
  }, [router]);

  if (!isMounted) return null;

  const isDark = colorScheme === "dark";

  const menuItems = [
    { label: "News", icon: <FaNewspaper />, href: "/internal/sidebar/news" },
    { label: "Task", icon: <FaTasks />, href: "/internal/sidebar/task" },
    { label: "Marketing", icon: <FaIdeal />, href: "/internal/sidebar/marketing" },
    { label: "Product", icon: <FaShoppingBag />, href: "/internal/sidebar/product" },
    { label: "Project", icon: <FaProjectDiagram />, href: "/internal/sidebar/project" },
    { label: "Profile", icon: <FaUser />, href: "/internal/sidebar/profile" },
    { label: "Setting", icon: <FaCog />, href: "/internal/sidebar/setting" },
  ];

  return (
    <>
      <Navbar />
      <SimpleGrid>
        <AppShell
          padding="md"
          layout="alt"
          header={{ height: 60 }}
          navbar={{
            width: 240,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          style={{
            background: isDark ? "linear-gradient(135deg, #121212, #1e1e1e)" : "linear-gradient(135deg, #2e7d32, #2a5298)",
            minHeight: "100vh",
            color: isDark ? theme.colors.gray[3] : "white",
          }}
        >
          {/* Sidebar */}
          <AppShell.Navbar
            pt="xl"
            p="xl"
            style={{ background: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}
          >
            <Stack mt={40} gap="md" pt={40}>
              <AnimatePresence>
                {menuItems.map((item, index) => (
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
                      label={item.label}
                      leftSection={item.icon}
                      style={{ color: "white", fontWeight: "bold", borderRadius: rem(8), padding: rem(12), transition: "all 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)")
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Stack>
          </AppShell.Navbar>

          {/* Main Content */}
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </SimpleGrid>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { AppShell, NavLink, SimpleGrid, Stack, useMantineTheme, rem, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { FaTasks, FaProjectDiagram, FaUser, FaCog, FaHome } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/src/utils/authProvider"; // Import AuthProvider
import Navbar from "@/src/components/landing/navbar";
import useUserWhoLogin from "@/src/utils/userWhoLogin";
import { useSession } from "next-auth/react";
export default function InternalLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);

  const { data: session } = useSession();
  console.log(session ? "Logged-in User by Session Storage:" : "No user found in localStorage.", session);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration error

  const isDark = colorScheme === "dark";

  const menuItems = [
    { label: "Product", icon: <FaHome />, href: "/internal/sidebar/product" },
    { label: "Task", icon: <FaTasks />, href: "/internal/sidebar/task" },
    { label: "Project", icon: <FaProjectDiagram />, href: "/internal/sidebar/project" },
    { label: "Profile", icon: <FaUser />, href: "/internal/sidebar/profile" },
    { label: "Setting", icon: <FaCog />, href: "/internal/sidebar/setting" },
  ];

  return (
    <AuthProvider>
      {" "}
      {/* ✅ Wrap InternalLayout with AuthProvider */}
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
    </AuthProvider>
  );
}

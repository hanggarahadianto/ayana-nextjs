"use client";

import { useEffect, useState, useMemo } from "react";
import { Flex, Image, Text, Group, Stack, Switch, Drawer, Burger, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { colorScheme } = useMantineColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
    setIsMobile(window.innerWidth <= 768);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <>
      {/* Mobile Drawer */}
      {isClient && (
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Menu"
          padding="md"
          size="sm"
          styles={{ body: { background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "white" } }}
        >
          <Stack gap={12} p={20}>
            <Stack align="flex-end">
              <ThemeSwitch />
            </Stack>

            <NavLink href="/banking-partners">Partner Bank</NavLink>
            <NavLink href="/about">Tentang Kami</NavLink>
          </Stack>
        </Drawer>
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: isDark ? "#1a1b1e" : "#beab96",
          padding: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transition: "background 0.5s ease-in-out",
        }}
      >
        <Flex justify="space-between" align="center">
          <Link href="/home" passHref>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="/images/ayana.png"
                height={30}
                width={65}
                alt="Logo"
                style={{ borderRadius: "15px", cursor: "pointer" }}
                ml={20}
              />
            </motion.div>
          </Link>

          {isClient && !isMobile ? (
            <Group gap={24} mr={20}>
              <NavLink href="/banking-partners">Partner Bank</NavLink>
              <NavLink href="/about">Tentang Kami</NavLink>
              <ThemeSwitch />
            </Group>
          ) : (
            isClient && isMobile && <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color="white" />
          )}
        </Flex>
      </motion.div>
    </>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} passHref style={{ textDecoration: "none" }}>
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
      <Text c="white" fw={500} style={{ cursor: "pointer" }}>
        {children}
      </Text>
    </motion.div>
  </Link>
);

const ThemeSwitch = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = useMemo(() => colorScheme === "dark", [colorScheme]);

  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
      <Switch
        checked={isDark}
        onChange={(event) => setColorScheme(event.currentTarget.checked ? "dark" : "light")}
        size="lg"
        onLabel={<FiSun size={16} />}
        offLabel={<FiMoon size={16} />}
        color="yellow"
      />
    </motion.div>
  );
};

export default Navbar;

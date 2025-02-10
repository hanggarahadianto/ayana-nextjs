import { useEffect, useState } from "react";
import { Flex, Image, Text, Group, SimpleGrid, Switch, useMantineColorScheme, Stack, Burger, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks"; // ✅ Import from @mantine/hooks
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // ✅ Detect mobile view

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = colorScheme === "dark";

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Menu" padding="md" size="sm">
        <Stack>
          <Link href="/banking-partners" passHref>
            <Text c={isDark ? "white" : "black"}>Partner Bank</Text>
          </Link>
          <Link href="/about" passHref>
            <Text c={isDark ? "white" : "black"}>Tentang Kami</Text>
          </Link>
          <Switch
            checked={isDark}
            onChange={(event) => setColorScheme(event.currentTarget.checked ? "dark" : "light")}
            size="lg"
            onLabel={<FiSun size={16} />}
            offLabel={<FiMoon size={16} />}
            color="yellow"
          />
        </Stack>
      </Drawer>

      <SimpleGrid bg={isDark ? "#1a1b1e" : "#beab96"} p="md" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Flex justify="space-between" align="center">
          <Stack>
            <Link href={"/home"} passHref>
              <Image ml={12} src="/images/ayana.png" height={28} width={60} alt="Logo" style={{ borderRadius: "15px" }} />
            </Link>
          </Stack>

          {/* Desktop Menu */}
          {!isMobile && ( // ✅ Hide on mobile
            <Group gap={20}>
              <Link href={"/banking-partners"} passHref>
                <Text mr={20} c={isDark ? "white" : "black"}>
                  Partner Bank
                </Text>
              </Link>
              <Link href={"/about"} passHref>
                <Text mr={20} c={isDark ? "white" : "black"}>
                  Tentang Kami
                </Text>
              </Link>
              <Switch
                checked={isDark}
                onChange={(event) => setColorScheme(event.currentTarget.checked ? "dark" : "light")}
                size="lg"
                onLabel={<FiSun size={16} />}
                offLabel={<FiMoon size={16} />}
                color="yellow"
              />
            </Group>
          )}

          {/* Mobile Menu Button */}
          {isMobile && ( // ✅ Show only on mobile
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" />
          )}
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Navbar;

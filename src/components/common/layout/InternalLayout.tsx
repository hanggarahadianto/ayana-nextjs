// "use client";

// import Navbar from "@/components/page/landing/navbar";
// import { menuItems } from "@/constants/navigation";
// import { AppShell, Burger, NavLink, Stack, rem, useMantineTheme, useMantineColorScheme } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// import Cookies from "js-cookie";
// import { useResponsiveLayout } from "@/styles/resposnsiveLayout/resposnvieLayout";

// export default function InternalLayoutClient({ children }: { children: React.ReactNode }) {
//   const [opened, { toggle }] = useDisclosure();
//   const [isMounted, setIsMounted] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   console.log("iscolaps", isCollapsed);
//   const { isMobile, isTablet, isLaptop } = useResponsiveLayout();

//   const router = useRouter();
//   const pathname = usePathname(); // selalu di atas
//   const theme = useMantineTheme();
//   const { colorScheme } = useMantineColorScheme();
//   const isDark = colorScheme === "dark";

//   useEffect(() => {
//     setIsMounted(true);
//     const token = Cookies.get("token");
//     if (!token) {
//       router.push("/home");
//     }
//   }, []);

//   if (!isMounted) return null;
//   // console.log("is collapse", isCollapsed);

//   // 1. Perhitungan width
//   const computedWidth = isMobile || isTablet ? 105 : isCollapsed ? 105 : 200;

//   // 2. Event handler collapse
//   const handleToggleCollapse = () => {
//     setIsCollapsed(true);
//   };

//   const handleToggleOpen = () => {
//     console.log("click open");
//     setIsCollapsed(false);
//   };

//   const isCollapsedOrMobile = isCollapsed || isMobile || isTablet; // ← boolean
//   const navbarWidth = isCollapsed ? 105 : 200; // hanya berdasar collapse

//   return (
//     <AppShell
//       header={{ height: 60 }}
//       navbar={{
//         width: navbarWidth,
//         breakpoint: "xs",
//         collapsed: { mobile: !opened },
//       }}
//       padding="md"
//       style={{
//         background: isDark ? "linear-gradient(135deg, #121212, #1e1e1e)" : "linear-gradient(135deg, #2e7d32, #2a5298)",
//         color: isDark ? theme.colors.gray[3] : "white",
//         minHeight: "100vh",
//       }}
//     >
//       <AppShell.Header>
//         <Navbar />
//         <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
//       </AppShell.Header>

//       <AppShell.Navbar
//         pt="xl"
//         p="xl"
//         style={{
//           background: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
//           backdropFilter: "blur(90px)",
//           overflowY: "auto",
//         }}
//       >
//         <Stack mt="md" gap="md">
//           <Stack justify="flex-end" align="flex-end" style={{ width: "100%" }}>
//             <button
//               onClick={isCollapsedOrMobile ? handleToggleOpen : handleToggleCollapse}
//               style={{
//                 cursor: "pointer",
//                 background: "transparent",
//                 border: "none",
//                 color: "white",
//               }}
//             >
//               {isCollapsedOrMobile ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
//             </button>
//           </Stack>

//           <AnimatePresence>
//             {menuItems.map((item, index) => (
//               <motion.div
//                 key={item.href}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
// <NavLink
//   component={Link}
//   href={item.href}
//   label={!isCollapsed ? item.label : undefined}
//   leftSection={item.icon}
//   active={pathname === item.href}
//   styles={(theme) => ({
//     root: {
//       color: "white",
//       fontWeight: "bold",
//       borderRadius: rem(8),
//       padding: rem(12),
//       transition: "background-color 0.3s ease, transform 0.3s ease",
//       "&:hover": {
//         transform: "scale(1.05)",
//         backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)",
//       },
//     },
//     label: {
//       whiteSpace: "nowrap",
//     },
//     // Atur style aktif via `active` key, bukan &[data-active]

//   })}
// />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </Stack>
//       </AppShell.Navbar>

//       <AppShell.Main style={{ marginTop: 20 }}>{children}</AppShell.Main>
//     </AppShell>
//   );
// }

"use client";

import { menuItems } from "@/constants/navigation";
import { AppShell, Burger, NavLink, Stack, rem, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Cookies from "js-cookie";
import { useResponsiveLayout } from "@/styles/resposnsiveLayout/resposnvieLayout";
import Navbar from "@/components/page/landing/navbar";

export default function InternalLayoutClient({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile, isTablet, isLaptop } = useResponsiveLayout();

  const [isClosed, setIsClosed] = useState(false);
  const [isToggleTriggered, setIsToggleTriggered] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    setIsMounted(true);
    const token = Cookies.get("token");
    if (!token) {
      router.push("/home");
    }
  }, [router]);

  if (!isMounted) return null;

  // Width logic

  const isClosedOrMobile = isClosed || isMobile || isTablet;
  const computedWidth = isToggleTriggered ? (isClosed ? 105 : 200) : isClosedOrMobile ? 105 : 200;

  // Toggle functions
  const toggleNav = () => {
    setIsToggleTriggered(true);
    if (isMobile || isTablet) {
      setIsClosed((prev) => !prev); // Toggle di mode mobile/tablet
    } else {
      setIsClosed((prev) => !prev); // Sama di desktop
    }
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
          overflowY: "auto",
        }}
      >
        <Stack mt="md" gap="md">
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
                  label={!isClosed ? item.label : undefined}
                  leftSection={item.icon}
                  active={pathname === item.href}
                  styles={(theme) => ({
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
                    // Atur style aktif via `active` key, bukan &[data-active]
                  })}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ marginTop: 20 }}>{children}</AppShell.Main>
    </AppShell>
  );
}

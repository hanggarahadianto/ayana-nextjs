// "use client";
// import { useState, useEffect } from "react";
// import { AppShell, NavLink, SimpleGrid, Stack, useMantineTheme, rem, useMantineColorScheme } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import Link from "next/link";
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/page/landing/navbar";
// import { menuItems } from "@/constants/navigation";

// export default function InternalLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const theme = useMantineTheme();
//   const { colorScheme } = useMantineColorScheme();
//   const [opened, { toggle }] = useDisclosure();
//   const [isMounted, setIsMounted] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

//   useEffect(() => {
//     setIsMounted(true);

//     // Check authentication token from cookies
//     const token = Cookies.get("token");

//     if (!token) {
//       router.push("/home");
//     }
//   }, []); // Router tidak perlu dalam dependency array

//   if (!isMounted) return null;

//   const isDark = colorScheme === "dark";

//   return (
//     <>
//       <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
//         <Navbar />
//       </div>
//       <SimpleGrid>
//         <AppShell
//           padding="md"
//           layout="alt"
//           header={{ height: 60 }}
//           navbar={{
//             width: isCollapsed ? 120 : 200, // Adjust width based on collapse state
//             breakpoint: "sm",
//             collapsed: { mobile: !opened },
//           }}
//           style={{
//             background: isDark ? "linear-gradient(135deg, #121212, #1e1e1e)" : "linear-gradient(135deg, #2e7d32, #2a5298)",
//             minHeight: "100vh",
//             color: isDark ? theme.colors.gray[3] : "white",
//           }}
//         >
//           <AppShell.Navbar
//             pt="xl"
//             p="xl"
//             style={{ background: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}
//           >
//             <Stack mt={10} gap="md" pt={40}>
//               <Stack justify="flex-end" align="flex-end" style={{ width: "100%" }}>
//                 <button
//                   onClick={() => setIsCollapsed(!isCollapsed)}
//                   style={{
//                     marginBottom: rem(2),

//                     cursor: "pointer",
//                     background: "transparent",
//                     border: "none",
//                     color: "white",
//                   }}
//                 >
//                   {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
//                 </button>
//               </Stack>

//               <AnimatePresence>
//                 {menuItems.map((item: any, index: any) => (
//                   <motion.div
//                     key={item.href}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                   >
//                     <NavLink
//                       component={Link}
//                       href={item.href}
//                       label={!isCollapsed ? item.label : undefined} // Show label only if not collapsed
//                       leftSection={item.icon}
//                       style={{
//                         color: "white",
//                         fontWeight: "bold",
//                         borderRadius: rem(8),
//                         padding: rem(12),
//                         transition: "background-color 0.3s ease, transform 0.3s ease",
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "scale(1.1)";
//                         e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "scale(1)"; // Zoom out on leave
//                         e.currentTarget.style.background = "transparent";
//                       }}
//                     >
//                       {isCollapsed && <span style={{ marginRight: rem(10) }}>{item.icon}</span>}
//                     </NavLink>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </Stack>
//           </AppShell.Navbar>

//           {/* Main Content */}
//           <AppShell.Main>{children}</AppShell.Main>
//         </AppShell>
//       </SimpleGrid>
//     </>
//   );
// }

"use client";

import { AppShell } from "@mantine/core";
import SidebarDesktop from "@/components/layout/sidebarDekstop";
import SidebarMobile from "@/components/layout/sidebarMobile";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

interface ResponsiveSidebarProps {
  opened: boolean;
  toggle: () => void;
  isDark: boolean;
}

export default function ResponsiveSidebar({ opened, toggle, isDark }: ResponsiveSidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AppShell
      // navbarOffset={0} // Menambahkan offset jika diperlukan
      padding="md"
      styles={{
        main: {
          backgroundColor: isDark ? "#121212" : "#ffffff",
        },
      }}
    >
      {isMobile ? (
        <SidebarMobile opened={opened} close={toggle} isDark={isDark} />
      ) : (
        <SidebarDesktop isCollapsed={isCollapsed} toggleCollapse={() => setIsCollapsed(!isCollapsed)} isDark={isDark} />
      )}
    </AppShell>
  );
}

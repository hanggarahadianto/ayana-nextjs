import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { menuItems } from "@/constants/navigation";

export default function SidebarDesktop({ isCollapsed, isDark, theme }: { isCollapsed: boolean; isDark: boolean; theme: any }) {
  return (
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
            label={!isCollapsed ? item.label : undefined}
            leftSection={item.icon}
            style={{
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "12px",
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
          >
            {isCollapsed && <span style={{ marginRight: "10px" }}>{item.icon}</span>}
          </NavLink>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

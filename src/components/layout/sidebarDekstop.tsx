import { Stack, NavLink } from "@mantine/core";
import Link from "next/link";
import { menuItems } from "@/constants/navigation";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export default function SidebarDesktop({ isCollapsed, toggleCollapse, isDark }: any) {
  return (
    <Stack pt={40} gap="md">
      <Stack justify="flex-end" align="flex-end" style={{ width: "100%" }}>
        <button
          onClick={toggleCollapse}
          style={{
            marginBottom: 8,
            cursor: "pointer",
            background: "transparent",
            border: "none",
            color: "white",
          }}
        >
          {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
      </Stack>

      {menuItems.map((item, idx) => (
        <NavLink
          key={item.href}
          component={Link}
          href={item.href}
          label={!isCollapsed ? item.label : undefined}
          leftSection={item.icon}
          style={{
            color: "white",
            fontWeight: "bold",
            borderRadius: 8,
            padding: 12,
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
        />
      ))}
    </Stack>
  );
}

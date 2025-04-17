import { Stack, NavLink, Drawer } from "@mantine/core";
import Link from "next/link";
import { menuItems } from "@/constants/navigation";

export default function SidebarMobile({ opened, close, isDark }: any) {
  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Menu"
      padding="md"
      size="xs"
      overlayProps={{ opacity: 0.5, blur: 2 }}
      styles={{
        content: {
          backgroundColor: isDark ? "#121212" : "#ffffff",
        },
      }}
    >
      <Stack gap="md">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.label}
            leftSection={item.icon}
            onClick={close}
            style={{
              color: isDark ? "white" : "#000",
              fontWeight: "bold",
              borderRadius: 8,
              padding: 12,
            }}
          />
        ))}
      </Stack>
    </Drawer>
  );
}

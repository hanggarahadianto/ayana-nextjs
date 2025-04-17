import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Stack, Button } from "@mantine/core";

export default function SidebarMobile({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Stack mt={10} gap="md" pt={40}>
      <Stack justify="flex-end" align="flex-end" style={{ width: "100%" }}>
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="outline"
          style={{
            background: "transparent",
            color: "white",
            border: "none",
          }}
        >
          {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </Button>
      </Stack>
    </Stack>
  );
}

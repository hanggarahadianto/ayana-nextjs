"use client";

import { Tooltip } from "@mantine/core";
import { ReactNode } from "react";
import BreathingActionIcon from "@/components/common/button/buttonAction";

interface SuperadminActionProps {
  user: IUser | null;
  onClick?: () => void;
  children: ReactNode; // bisa BreathingActionIcon, ButtonDelete, dsb
  size?: string | number;
  activeColor?: string;
  disabledColor?: string;
}

/**
 * Komponen wrapper untuk aksi yang hanya boleh diakses superadmin
 */
const SuperadminAction = ({
  user,
  onClick,
  children,
  size = "2.2rem",
  activeColor = "#5DADE2",
  disabledColor = "#AAB7B8",
}: SuperadminActionProps) => {
  const isSuperAdmin = user?.username === "superadmin";

  if (isSuperAdmin) {
    // Jika children adalah BreathingActionIcon → inject props
    if ((children as any)?.type === BreathingActionIcon) {
      return <BreathingActionIcon onClick={onClick!} icon={(children as any).props.icon} size={size} backgroundColor={activeColor} />;
    }

    // Kalau children bukan BreathingActionIcon → render langsung
    return <span onClick={onClick}>{children}</span>;
  }

  // Kalau bukan superadmin → disable dengan tooltip
  return (
    <Tooltip label="superadmin only" withArrow position="top">
      <span style={{ display: "inline-flex", pointerEvents: "none" }}>
        {(children as any)?.type === BreathingActionIcon ? (
          <BreathingActionIcon
            onClick={(e) => e.preventDefault()}
            icon={(children as any).props.icon}
            size={size}
            backgroundColor={disabledColor}
            disabled
          />
        ) : (
          <span style={{ opacity: 0.5 }}>{children}</span>
        )}
      </span>
    </Tooltip>
  );
};

export default SuperadminAction;

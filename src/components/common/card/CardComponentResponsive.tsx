"use client";

import { Card, Stack, Text } from "@mantine/core";
import useScreenSize from "@/lib/hook/useScreenSize";
import { ReactNode } from "react";

interface CardComponentUIProps {
  title: string;
  status?: string;
  children?: ReactNode;
}

const CardComponentResponsive = ({ title, status, children }: CardComponentUIProps) => {
  const { screenType } = useScreenSize();
  const fontSize = screenType === "small" ? "lg" : "xl";
  const cardPadding = screenType === "small" ? "16px" : "20px";

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
    backdropFilter: "blur(8px)",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: cardPadding,
    position: "relative",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
    transform: "scale(1)",
  };

  return (
    <Card
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Stack w="100%" mih={120} style={{ flexGrow: 1 }}>
        <Text fw={900} size={fontSize} style={{ color: "#ffffff" }}>
          {title}
        </Text>
        {status && (
          <Text fw={200} mt={0} size="sm" style={{ color: "#ffffff" }}>
            {status}
          </Text>
        )}
      </Stack>

      {/* Tempat isi tambahan dari parent */}
      {children && <div style={{ marginTop: 12 }}>{children}</div>}
    </Card>
  );
};

export default CardComponentResponsive;

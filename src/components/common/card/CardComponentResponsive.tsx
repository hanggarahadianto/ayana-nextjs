"use client";
import { Card, Group, Stack, Text } from "@mantine/core";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import useScreenSize from "@/lib/hook/useScreenSize";

interface CardComponentProps {
  id: string;
  title: string;
  status?: string;
  onSelect?: () => void;
  onDelete?: (id: string) => void;
}

const CardComponentResponsive = ({ id, title, status, onSelect, onDelete }: CardComponentProps) => {
  const { screenType } = useScreenSize();

  const fontSize = screenType === "small" ? "lg" : "xl";
  const cardPadding = screenType === "small" ? "16px" : "20px";

  return (
    <Card
      style={{
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
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={onSelect}
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

      {onDelete && (
        <Group justify="flex-end" wrap="nowrap" mt={12}>
          <ButtonDeleteWithConfirmation id={id} onDelete={onDelete} description={`Apakah anda ingin menghapus ${title}?`} size={2.5} />
        </Group>
      )}
    </Card>
  );
};

export default CardComponentResponsive;

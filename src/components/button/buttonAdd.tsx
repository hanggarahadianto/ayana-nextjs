import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface ButtonAddProps {
  onClick: () => void;
  size: string;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onClick, size }) => {
  return (
    <ActionIcon
      onClick={onClick}
      size={size}
      // size="3.5rem"
      radius="xl"
      variant="gradient"
      gradient={{ from: "green", to: "lime", deg: 90 }}
      style={{
        transition: "transform 0.2s ease, boxShadow 0.2s ease, filter 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 255, 0, 0.7)";
        e.currentTarget.style.filter = "brightness(1.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.filter = "brightness(1)";
      }}
    >
      <IconPlus size="1.5rem" />
    </ActionIcon>
  );
};

export default ButtonAdd;

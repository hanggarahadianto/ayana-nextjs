import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface ButtonAddProps {
  onClick: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onClick }) => {
  return (
    <ActionIcon
      onClick={onClick}
      size="3.5rem"
      radius="xl"
      variant="gradient"
      gradient={{ from: "green", to: "lime", deg: 90 }}
      style={{
        transition: "transform 0.2s ease, boxShadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 255, 0, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <IconPlus size="1.5rem" />
    </ActionIcon>
  );
};

export default ButtonAdd;

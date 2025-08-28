import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface ButtonDeleteProps {
  onClick: () => void;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ onClick }) => {
  return (
    <ActionIcon
      mt={2}
      onClick={onClick}
      size="2.5rem"
      radius="xl"
      variant="gradient"
      gradient={{ from: "red", to: "orange", deg: 90 }}
      style={{
        transition: "transform 0.2s ease, boxShadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(255, 0, 0, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <IconTrash size="1rem" />
    </ActionIcon>
  );
};

export default ButtonDelete;

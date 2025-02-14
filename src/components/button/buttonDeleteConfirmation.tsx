import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

interface ButtonDeleteProps {
  id: string;
  onDelete: (id: string) => void;
  description: string;
}

const ButtonDeleteWithConfirmation: React.FC<ButtonDeleteProps> = ({ id, onDelete, description }) => {
  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: "Konfirmasi Hapus",
      children: <p>{description}</p>,
      labels: { confirm: "Ya", cancel: "Tidak" },
      confirmProps: { color: "red" },
      onConfirm: () => onDelete(id),
      centered: true,
    });
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <ActionIcon
        onClick={openDeleteModal}
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
    </div>
  );
};

export default ButtonDeleteWithConfirmation;

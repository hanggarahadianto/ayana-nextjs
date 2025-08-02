"use client";

import { ActionIcon, Button, Loader, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ButtonDeleteProps {
  onDelete: () => void;
  isLoading: boolean; // dikontrol dari luar, wajib
  description: string;
  size: number;
}

const ButtonDeleteWithConfirmation: React.FC<ButtonDeleteProps> = ({ onDelete, isLoading, description, size }) => {
  const [opened, setOpened] = useState(false);
  const [wasLoading, setWasLoading] = useState(false);

  // Deteksi selesai loading dari luar, lalu tutup modal
  useEffect(() => {
    if (wasLoading && !isLoading) {
      setOpened(false);
    }
    setWasLoading(isLoading);
  }, [isLoading, wasLoading]);

  return (
    <>
      <Modal opened={opened} onClose={() => !isLoading && setOpened(false)} title="Konfirmasi Hapus" centered>
        <Text mb="md">{description}</Text>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button variant="default" onClick={() => setOpened(false)} disabled={isLoading}>
            Tidak
          </Button>
          <Button color="red" onClick={onDelete} loading={isLoading} disabled={isLoading}>
            Ya
          </Button>
        </div>
      </Modal>

      <div onClick={(e) => e.stopPropagation()}>
        <ActionIcon
          onClick={() => setOpened(true)}
          size={`${size}rem`}
          radius="xl"
          variant="gradient"
          gradient={{ from: "red", to: "orange", deg: 90 }}
          disabled={isLoading}
        >
          {isLoading ? <Loader color="white" size="xs" /> : <IconTrash size="1rem" />}
        </ActionIcon>
      </div>
    </>
  );
};

export default ButtonDeleteWithConfirmation;

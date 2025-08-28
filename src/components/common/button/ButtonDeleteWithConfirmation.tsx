"use client";

import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { ActionIcon, Button, Modal, Text, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ButtonDeleteProps {
  onDelete: () => void;
  isLoading: boolean;
  description: string;
  size: number;
}

const ButtonDeleteWithConfirmation: React.FC<ButtonDeleteProps> = ({ onDelete, isLoading, description, size }) => {
  const [opened, setOpened] = useState(false);
  const [wasLoading, setWasLoading] = useState(false);

  const { user } = useLoggedInUser();
  const isSuperAdmin = user?.role === "superadmin";

  useEffect(() => {
    if (wasLoading && !isLoading) setOpened(false);
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
        {isSuperAdmin ? (
          // SUPERADMIN: tidak ada tooltip, tombol aktif
          <ActionIcon
            aria-label="Hapus"
            onClick={() => setOpened(true)}
            size={`${size}rem`}
            radius="xl"
            variant="gradient"
            gradient={{ from: "red", to: "orange", deg: 90 }}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        ) : (
          // NON-SUPERADMIN: tooltip muncul, tombol disabled
          <Tooltip label="superadmin only" withArrow position="top">
            <span style={{ display: "inline-flex" }}>
              <ActionIcon
                // color="grey"
                aria-label="Hapus (superadmin only)"
                onClick={(e) => e.preventDefault()}
                size={`${size}rem`}
                radius="xl"
                variant="gradient"
                gradient={{ from: "orange", to: "slate", deg: 90 }}
                disabled
              >
                <IconTrash size="1rem" />
              </ActionIcon>
            </span>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default ButtonDeleteWithConfirmation;

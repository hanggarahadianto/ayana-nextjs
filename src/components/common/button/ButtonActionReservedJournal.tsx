"use client";

import { ActionIcon } from "@mantine/core";
import { IoIosSend } from "react-icons/io";

interface ButtonSendJournalProps {
  onClick: () => void;
  size: number;
}

const ButtonReversedJournal: React.FC<ButtonSendJournalProps> = ({ onClick, size }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <ActionIcon
        onClick={onClick}
        size={`${size}rem`}
        radius="xl"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        style={{ transition: "transform 0.2s ease, boxShadow 0.2s ease" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 255, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <IoIosSend size="1rem" />
      </ActionIcon>
    </div>
  );
};

export default ButtonReversedJournal;

import { ActionIcon } from "@mantine/core";
import { useState, ReactNode } from "react";

interface BreathingActionIconProps {
  onClick: () => void;
  icon: ReactNode;
}

const BreathingActionIcon = ({ onClick, icon }: BreathingActionIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <style>
        {`
          @keyframes breathing {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

      <ActionIcon
        onClick={onClick}
        size="2.8rem"
        radius="lg"
        variant="white"
        style={{
          transition: "transform 0.3s ease-in-out",
          animation: isHovered ? "breathing 1.5s infinite ease-in-out" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon}
      </ActionIcon>
    </div>
  );
};

export default BreathingActionIcon;

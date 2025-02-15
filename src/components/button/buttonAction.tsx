import { ReactNode } from "react";

interface BreathingActionIconProps {
  onClick: () => void;
  size: string | number;
  icon: ReactNode;
  color?: string;
  gradient?: string;
}

const BreathingActionIcon = ({ onClick, size, icon, color = "white", gradient }: BreathingActionIconProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: gradient || "linear-gradient(135deg, #38a169, #2f855a)", // Default green gradient
        color: color,
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon}
    </button>
  );
};

export default BreathingActionIcon;

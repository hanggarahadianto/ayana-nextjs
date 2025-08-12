import { ReactNode } from "react";

interface BreathingActionIconProps {
  onClick: () => void;
  size: string | number;
  icon: ReactNode;
  backgroundColor?: string;
  gradient?: string;
  disabled?: boolean;
}

const BreathingActionIcon = ({ onClick, size, icon, backgroundColor, gradient, disabled }: BreathingActionIconProps) => {
  // Tentukan warna background:
  const finalBackground = disabled ? "#1e293b" : backgroundColor || gradient || "linear-gradient(135deg, #38a169, #2f855a)";

  const cursorStyle = disabled ? "not-allowed" : "pointer";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: finalBackground,
        border: "none",
        cursor: cursorStyle,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon}
    </button>
  );
};

export default BreathingActionIcon;

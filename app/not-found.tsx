import React from "react";

export default function NotFound() {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    content: {
      textAlign: "center",
      padding: "2rem",
    },
    code: {
      fontSize: "8rem",
      fontWeight: 900,
      color: "#2c3e50",
      margin: 0,
      textShadow: "4px 4px 0px rgba(0,0,0,0.1)",
    },
    bounce: {
      display: "inline-block",
      animation: "bounce 2s infinite",
    },
    message: {
      fontSize: "1.5rem",
      color: "#666",
      margin: "1rem 0",
    },
    animation: {
      position: "relative",
      height: "100px",
      margin: "2rem 0",
    },
    ball: {
      width: "40px",
      height: "40px",
      background: "#e74c3c",
      borderRadius: "50%",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      animation: "ball-bounce 1s infinite ease-in-out",
    },
    shadow: {
      width: "40px",
      height: "10px",
      background: "rgba(0,0,0,0.2)",
      borderRadius: "50%",
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      animation: "shadow-bounce 1s infinite ease-in-out",
    },
    button: {
      display: "inline-block",
      padding: "12px 24px",
      background: "#3498db",
      color: "white",
      textDecoration: "none",
      borderRadius: "25px",
      fontSize: "1.1rem",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.code}>
            4<span style={styles.bounce}>0</span>4
          </h1>
          <p style={styles.message}>Halaman yang Anda cari tidak ditemukan.</p>
          <div style={styles.animation}>
            <div style={styles.ball}></div>
            <div style={styles.shadow}></div>
          </div>
          <a href="/" style={styles.button}>
            Kembali ke Beranda
          </a>
        </div>
      </div>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
          }
          @keyframes ball-bounce {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -60px); }
          }
          @keyframes shadow-bounce {
            0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.2; }
            50% { transform: translateX(-50%) scale(0.6); opacity: 0.4; }
          }
          a:hover {
            background: #2980b9;
            transform: translateY(-2px);
          }
        `}
      </style>
    </>
  );
}

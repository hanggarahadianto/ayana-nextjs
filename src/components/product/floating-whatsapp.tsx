"use client";

import React from "react";
import { ActionIcon, Stack, Text } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
const FloatingWhatsApp = () => {
const isMobile = useMediaQuery('(max-width: 768px)');
const phoneNumber = "62895421711315";
const message =
    "Halo! Saya menghubungi Anda melalui website dan tertarik dengan rumah yang ditawarkan. Bisa berikan informasi lebih lanjut? Jika ada katalog atau daftar harga, saya ingin melihatnya. Apakah ada promo saat ini? Saya tunggu responnya. Terima kasih! 😊";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
const handleClick = () => {
if (typeof window !== 'undefined') {
    if (navigator.share) {
    navigator
        .share({
        title: "Hubungi Kami via WhatsApp",
        text: message,
        url: whatsappUrl,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
    window.open(whatsappUrl, "_blank");
    }
}
};

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <Text
        size="lg"
        style={{
          fontWeight: 700,
          color: "#fff",
          background: "linear-gradient(45deg, #25D366, #128C7E)",
          padding: "8px 16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        Hubungi Kami
      </Text>
      <Stack align="center" mt={10}>
        <ActionIcon
          component="button"
          onClick={handleClick}
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            color: "white",
            width: isMobile ? "70px" : "90px",
            height: isMobile ? "70px" : "90px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            animation: "pulse 1.5s infinite",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
        <IconBrandWhatsapp size={isMobile ? 40 : 60} />
        </ActionIcon>
      </Stack>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingWhatsApp;

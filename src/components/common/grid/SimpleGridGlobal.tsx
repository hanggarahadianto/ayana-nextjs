"use client";

import { Card, SimpleGrid, SimpleGridProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface SimpleGridGlobalProps extends SimpleGridProps {
  children: React.ReactNode;
}

const SimpleGridGlobal = ({ children, spacing = "lg", ...props }: SimpleGridGlobalProps) => {
  // Menentukan ukuran layar menggunakan media query
  const isSmallScreen = useMediaQuery("(max-width: 767px)"); // Mobile
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)"); // Tablet
  const isLaptopScreen = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)"); // Laptop 12-14 inch
  const isWideScreen = useMediaQuery("(min-width: 1440px)"); // Laptop 15 inch ke atas

  // Menentukan jumlah kolom berdasarkan ukuran layar
  const cols = isSmallScreen ? 1 : isMediumScreen ? 2 : isLaptopScreen ? 3 : isWideScreen ? 4 : 4;

  return (
    <SimpleGrid
      // bg={"pink"}
      cols={cols} // Menggunakan cols yang ditentukan berdasarkan ukuran layar
      spacing={spacing}
      {...props}
    >
      <Card p="md" radius="md" shadow="sm" bg={"#1a1a1a"}>
        {children}
      </Card>
    </SimpleGrid>
  );
};

export default SimpleGridGlobal;

// utils/responsiveLayout.ts
import { useMediaQuery } from "@mantine/hooks";

export function useResponsiveLayout() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1025px)");

  return { isMobile, isTablet, isLaptop };
}

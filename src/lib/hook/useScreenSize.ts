import { useMediaQuery } from "@mantine/hooks";

const useScreenSize = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLaptopScreen = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)");
  const isWideScreen = useMediaQuery("(min-width: 1440px)");

  const screenType = isSmallScreen ? "small" : isMediumScreen ? "medium" : isLaptopScreen ? "laptop" : isWideScreen ? "wide" : "unknown";

  return {
    isSmallScreen,
    isMediumScreen,
    isLaptopScreen,
    isWideScreen,
    screenType,
  };
};

export default useScreenSize;

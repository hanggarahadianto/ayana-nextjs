import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const ProductImageGallery = ({ items }: { items: { original: string; thumbnail: string }[] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const originalSize = isMobile ? "w_800,h_400" : isTablet ? "w_1200,h_600" : "w_1800,h_900";
  const thumbnailSize = isMobile ? "w_120,h_90" : isTablet ? "w_200,h_150" : "w_250,h_160";

  const resizedItems = items.map((item) => ({
    original: item.original.replace("/image/upload/", `/image/upload/${originalSize},c_fill/`),
    thumbnail: item.thumbnail.replace("/image/upload/", `/image/upload/${thumbnailSize},c_fill/`),
    originalAlt: "Gallery Image",
    thumbnailAlt: "Thumbnail",
  }));

  // Custom render function with lazy loading
  const renderItem = (item: any) => (
    <img
      src={item.original}
      alt={item.originalAlt || "Image"}
      loading="lazy"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "12px",
      }}
    />
  );

  const renderThumbInner = (item: any) => (
    <img
      src={item.thumbnail}
      alt={item.thumbnailAlt || "Thumbnail"}
      loading="lazy"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );

  return (
    <Stack
      align="center"
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <Box
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          margin: "0 auto",
        }}
      >
        <ImageGallery
          {...({
            items: resizedItems,
            showThumbnails: true,
            showFullscreenButton: false,
            showPlayButton: false,
            autoPlay: !isMobile,
            slideDuration: 500,
            slideInterval: 3000,
            infinite: true,
            additionalClass: "custom-gallery",
            renderItem,
            renderThumbInner,
          } as any)}
        />
      </Box>
    </Stack>
  );
};

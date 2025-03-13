import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useMediaQuery } from "@mantine/hooks";

const images = [
  {
    original: "https://picsum.photos/id/1018/1600/900/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1600/900/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1600/900/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const MyGallery = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <ImageGallery
        items={images}
        showThumbnails={!isMobile}
        showFullscreenButton={true}
        showPlayButton={false}
        autoPlay={!isMobile}
        slideDuration={500}
        slideInterval={3000}
        infinite={true}
        additionalClass="custom-gallery"
      />
      <style jsx>{`
        :global(.custom-gallery .image-gallery-slide img) {
          max-height: ${isMobile ? "220px" : isTablet ? "300px" : "400px"};
          object-fit: cover;
          width: 100%;
          border-radius: 12px;
        }

        :global(.image-gallery-fullscreen .image-gallery-slide img) {
          max-height: 100vh;
          object-fit: contain;
          width: 100vw;
          height: 100vh;
        }

        :global(.custom-gallery .image-gallery-thumbnails-wrapper) {
          margin-top: 10px;
        }

        :global(.custom-gallery .image-gallery-thumbnail) {
          height: ${isMobile ? "40px" : "60px"};
          border-radius: 8px;
          overflow: hidden;
        }

        :global(.custom-gallery .image-gallery-thumbnail img) {
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

export default MyGallery;

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

  return (
    <div
      style={{
        width: "95vw",
        maxWidth: isMobile ? "400px" : "1400px", // ✅ Limit width on mobile
        margin: "auto",
      }}
    >
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
          max-height: ${isMobile ? "220px" : "350px"}; /* ✅ Adjust height */
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
          height: 50px; /* ✅ Smaller thumbnails for mobile */
          border-radius: 8px;
          overflow: hidden;
        }

        :global(.custom-gallery .image-gallery-thumbnail img) {
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default MyGallery;

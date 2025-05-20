import { shimmer, toBase64 } from "@/helper/generateShimmer";
import Image from "next/image";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const CloudinaryImage = ({ src, alt, width = 300, height = 200, className = "" }: CloudinaryImageProps) => {
  return (
    <Image
      src={src || ""}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
      style={{
        objectFit: "cover",
        borderRadius: "8px",
      }}
      className={className}
    />
  );
};

export default CloudinaryImage;

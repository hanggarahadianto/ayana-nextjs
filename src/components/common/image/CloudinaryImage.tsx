import { shimmer, toBase64 } from "@/helper/generateShimmer";
import Image from "next/image";

const transformCloudinaryURL = (url: string, transformation = "w_384,q_75") => {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/${transformation}/`);
};

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  transformation?: string;
}

const CloudinaryImage = ({ src, alt, width = 300, height = 200, className = "", transformation = "w_384,q_75" }: CloudinaryImageProps) => {
  const transformedSrc = transformCloudinaryURL(src, transformation);

  return (
    <Image
      src={transformedSrc}
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

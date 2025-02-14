declare module "react-image-gallery" {
  import { Component } from "react";

  export interface Image {
    original: string;
    thumbnail?: string;
    originalAlt?: string;
    originalTitle?: string;
    thumbnailAlt?: string;
    thumbnailTitle?: string;
    description?: string;
    srcSet?: string;
    sizes?: string;
    loading?: "lazy" | "eager";
    fullscreen?: string;
  }

  export interface ReactImageGalleryProps {
    items: Image[];
    showThumbnails?: boolean;
    showFullscreenButton?: boolean;
    showPlayButton?: boolean;
    autoPlay?: boolean;
    slideDuration?: number;
    slideInterval?: number;
    infinite?: boolean;
    showBullets?: boolean;
    showNav?: boolean;
    additionalClass?: string;
    onClick?: (event: React.MouseEvent) => void;
  }

  class ReactImageGallery extends Component<ReactImageGalleryProps> {}

  export default ReactImageGallery;
}

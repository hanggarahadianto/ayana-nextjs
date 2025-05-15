// api/images/getImages.ts
import { APIAxiosInstanceMultipart } from "../../lib";

interface ExistingImage {
  id: string;
  url: string;
}

interface ImageResponse {
  images: ExistingImage[];
  thumbnail: string;
}

export const getImages = async (productId?: string): Promise<ImageResponse> => {
  const response = await APIAxiosInstanceMultipart.get(`/home/${productId}/images`);
  return response.data as ImageResponse;
};

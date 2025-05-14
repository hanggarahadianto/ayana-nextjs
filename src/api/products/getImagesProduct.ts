// api/images/getImages.ts
import { APIAxiosInstanceMultipart } from "../../lib";

interface ImageResponse {
  images: string[];
  thumbnail: string;
}

export const getImages = async (productId?: string): Promise<ImageResponse> => {
  const response = await APIAxiosInstanceMultipart.get(`/home/${productId}/images`);
  return response.data as ImageResponse;
};

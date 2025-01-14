"use client";
import { Button, Container, Group, Stack, Text } from "@mantine/core";
import AdditionalInfoMaps from "./maps";
import { useQuery } from "@tanstack/react-query";
import { getDataAdditionalInfo } from "@/src/api/additional-info/getDataAdditionalInfo";
import { FaLocationArrow } from "react-icons/fa";

interface AdditionalInfoProps {
  id: string;
}

const AdditionalInfoProduct: React.FC<AdditionalInfoProps> = ({ id }) => {
  const {
    data: additionalInfo,
    isLoading: isLoadingGetAdditionalInfoData,
    refetch: refetchAdditionalInfoData,
  } = useQuery({
    queryKey: ["getAdditionalInfoData"],
    queryFn: () => getDataAdditionalInfo(id),

    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  console.log(additionalInfo);

  return (
    <Stack>
      <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
        Lokasi
      </Text>
      <AdditionalInfoMaps maps={additionalInfo?.maps} />
      <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
        Disekitar Unit
      </Text>
      {additionalInfo?.nearBy && (
        <Stack>
          {additionalInfo.nearBy.map((place: any) => (
            <Group key={place.id}>
              <FaLocationArrow size={14} />
              <Text>
                {place.distance} Ke {place.name}
              </Text>
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default AdditionalInfoProduct;

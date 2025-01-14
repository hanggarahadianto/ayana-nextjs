"use client";
import { Button, Container, Group, Stack, Text } from "@mantine/core";
import AdditionalInfoMaps from "./maps";
import { FaLocationArrow } from "react-icons/fa";

interface AdditionalInfoProps {
  maps: any;
  nearBy: any[];
}

const AdditionalInfoProduct: React.FC<AdditionalInfoProps> = ({
  maps,
  nearBy,
}) => {
  return (
    <Stack>
      <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
        Lokasi
      </Text>
      <AdditionalInfoMaps maps={maps} />
      <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
        Disekitar Unit
      </Text>
      {nearBy && (
        <Stack>
          {nearBy.map((place: any) => (
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

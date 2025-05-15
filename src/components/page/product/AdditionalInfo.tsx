"use client";
import { Button, Container, Divider, Group, Stack, Text } from "@mantine/core";
import { FaLocationArrow } from "react-icons/fa";

interface AdditionalInfoProps {
  nearBy: INearBy[];
  location?: string;
}

const AdditionalInfoProduct: React.FC<AdditionalInfoProps> = ({ nearBy, location }) => {
  return (
    <Stack>
      <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
        Disekitar Unit
      </Text>
      {nearBy && (
        <Stack>
          {nearBy.map((place: any) => (
            <Group key={place.id} mt={20}>
              <FaLocationArrow size={14} />
              <Text>
                {place.distance} Menit Ke {place.name}
              </Text>
            </Group>
          ))}
        </Stack>
      )}
      <Divider mt={"40px"} />
      <Text mt={40} size="xl" fw={800} style={{ fontFamily: "Lora" }}>
        Lokasi
      </Text>
      <Text size="md" fw={300} style={{ fontFamily: "Lora" }}>
        {location}
      </Text>
    </Stack>
  );
};

export default AdditionalInfoProduct;

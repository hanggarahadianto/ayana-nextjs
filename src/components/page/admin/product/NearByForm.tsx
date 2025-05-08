// components/form/FormCreateNearBy.tsx
import React from "react";
import { TextInput, Group } from "@mantine/core";

type Props = {
  setFieldValue: (field: string, value: any) => void;
};

const NearByForm: React.FC<Props> = ({ setFieldValue }) => {
  return (
    <Group grow>
      <TextInput label="Terdekat" value="Stasiun MRT Blok M (1 km)" />
      <TextInput label="Terdekat" value="Mall Gandaria City (2.5 km)" />
    </Group>
  );
};

export default NearByForm;

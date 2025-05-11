import React from "react";
import { FieldArray, FieldArrayRenderProps } from "formik";
import { Group, Stack, TextInput, Text } from "@mantine/core";
import ButtonAdd from "@/components/common/button/buttonAdd";

interface INearBy {
  name: string;
  distance: string;
}

interface Props {
  setFieldValue: (field: string, value: any) => void;
  values: { near_by: INearBy[] };
}

const NearByForm: React.FC<Props> = ({ setFieldValue, values }) => {
  return (
    <FieldArray name="near_by">
      {({ push }: FieldArrayRenderProps) => (
        <Stack>
          <Group justify="flex-end">
            <Text size="md" fw={200}>
              Tambah Lokasi Terdekat
            </Text>

            <ButtonAdd onClick={() => push({ name: "", distance: "" })} size="3.5rem" />
          </Group>

          {values.near_by.map((item, index) => (
            <Group grow key={index}>
              <TextInput
                label="Nama Tempat"
                placeholder="Contoh: Sekolah"
                value={item.name}
                onChange={(e) => setFieldValue(`near_by[${index}].name`, e.currentTarget.value)}
              />
              <TextInput
                label="Jarak (meter)"
                placeholder="Contoh: 200"
                value={item.distance}
                onChange={(e) => setFieldValue(`near_by[${index}].distance`, e.currentTarget.value)}
              />
            </Group>
          ))}
        </Stack>
      )}
    </FieldArray>
  );
};

export default NearByForm;

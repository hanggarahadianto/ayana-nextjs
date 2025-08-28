import React from "react";
import { FieldArray, FieldArrayRenderProps } from "formik";
import { Group, Stack, TextInput, Text, ActionIcon } from "@mantine/core";
import ButtonAdd from "@/components/common/button/buttonAdd";
import ButtonDelete from "@/components/common/button/ButtonDeleteWithoutConfirmation";
interface INearByCreate {
  name: string;
  distance: string;
}

interface Props {
  setFieldValue: (field: string, value: any) => void;
  values: { near_bies: INearByCreate[] };
}

const NearByForm: React.FC<Props> = ({ setFieldValue, values }) => {
  return (
    <FieldArray name="near_bies">
      {({ push, remove }: FieldArrayRenderProps) => (
        <Stack>
          <Group justify="flex-end" align="center">
            <Text size="md" fw={200}>
              Tambah Lokasi Terdekat
            </Text>

            <ButtonAdd onClick={() => push({ name: "", distance: "" })} size="3.5rem" />
          </Group>

          {values.near_bies?.map((item, index) => (
            <Group key={index} w={"100%"} align="flex-end">
              <TextInput
                label="Nama Tempat"
                placeholder="Contoh: Sekolah"
                value={item.name}
                onChange={(e) => setFieldValue(`near_bies[${index}].name`, e.currentTarget.value)}
              />
              <TextInput
                label="Jarak (menit)"
                placeholder="Contoh: 10 Menit"
                value={item.distance}
                onChange={(e) => setFieldValue(`near_bies[${index}].distance`, e.currentTarget.value)}
              />

              <ButtonDelete onClick={() => remove(index)} />
            </Group>
          ))}
        </Stack>
      )}
    </FieldArray>
  );
};

export default NearByForm;

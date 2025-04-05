import ButtonAdd from "@/lib/button/buttonAdd";
import ButtonDelete from "@/lib/button/butttonDelete";
import { Card, Group, InputWrapper, Text, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { memo, useCallback } from "react";

import _ from "lodash";

const FormInfo = ({ debouncedInfos, setDebouncedInfos }) => {
  const handleInfoChange = useCallback(
    (field: keyof IInfoCreate, value: any) => {
      setDebouncedInfos((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setDebouncedInfos]
  );

  const addNearByField = useCallback(() => {
    setDebouncedInfos((prev) => ({
      ...prev,
      near_by: [...(prev.near_by || []), { name: "", distance: "" }],
    }));
  }, [setDebouncedInfos]);

  const handleNearByChange = useCallback(
    <T extends keyof INearByCreate>(index: number, field: T, value: INearByCreate[T]) => {
      setDebouncedInfos((prev) => {
        const updatedNearBy = _.cloneDeep(prev?.near_by || []);
        _.set(updatedNearBy, `[${index}].${String(field)}`, value);

        return {
          ...prev,
          near_by: updatedNearBy,
        };
      });
    },
    [setDebouncedInfos] // Dependency array assumes setDebouncedInfos is a stable setter from useState or similar
  );

  const deleteNearByField = useCallback(
    (nearByList: INearBy[], index: number) => {
      setDebouncedInfos((prev) => ({
        ...prev,
        near_by: nearByList.filter((_, i) => i !== index),
      }));
    },
    [setDebouncedInfos]
  );

  return (
    <>
      <Textarea
        label="Maps"
        placeholder="Masukan Maps"
        defaultValue={debouncedInfos?.maps} // Pastikan values.note sudah terdefinisi dalam Formik state
        onBlur={(e) => handleInfoChange("maps", e.target.value)} // Update saat onBlur
      />
      <NumberInput
        hideControls
        label="Harga Awal"
        placeholder="Masukan Harga Awal (Rp)"
        value={debouncedInfos?.start_price ? `Rp. ${Number(debouncedInfos.start_price).toLocaleString("id-ID")}` : ""}
        onChange={(value) => {
          handleInfoChange("start_price", Number(value) || "");
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp. "
        required
      />

      <Group justify="space-between">
        <Text fw={400}>Tambahkan Lokasi Terdekat</Text>
        <ButtonAdd onClick={() => addNearByField()} size="2.5rem" />
      </Group>
      <Stack mt="md">
        {Array.isArray(debouncedInfos.near_by) &&
          debouncedInfos.near_by.map((nearBy: INearBy, index: number) => (
            <Card key={index} shadow="lg" padding="lg" radius="md">
              <Group>
                <TextInput
                  label={`Nama Lokasi ${index + 1}`}
                  defaultValue={nearBy.name}
                  onBlur={(e) => handleNearByChange(index, "name", e.target.value.toUpperCase())}
                  placeholder="Masukan Lokasi"
                />

                <NumberInput
                  hideControls
                  label={`Jarak ${index + 1}`}
                  defaultValue={nearBy.distance}
                  onBlur={(e) => handleNearByChange(index, "distance", e.target.value.toUpperCase())}
                  placeholder="Masukan Jarak"
                />

                <Stack mt={20}>
                  <ButtonDelete onClick={() => deleteNearByField(debouncedInfos.near_by || [], index)} />
                </Stack>
              </Group>
            </Card>
          ))}
      </Stack>
    </>
  );
};

export default memo(FormInfo);

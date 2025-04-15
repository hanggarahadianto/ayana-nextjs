import ButtonAdd from "@/components/common/button/buttonAdd";
import ButtonDelete from "@/components/common/button/butttonDelete";
import { Card, Group, Text, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import { memo, useCallback, useRef } from "react";

import _, { debounce } from "lodash";
import { validateInfos } from "@/utils/validation/info-validation";

interface FormInfoProps {
  initialData: any;
  //   initialData: IProductUpdate | undefined;
}

const FormEditInfo = ({ initialData }: FormInfoProps) => {
  //   const debouncedValidateRef = useRef(
  //     debounce((values: IInfoCreate) => {
  //       validateInfos(values, undefined, setErrorsInfo);
  //     }, 900)
  //   );

  //   const handleInfoChange = useCallback(
  //     (field: keyof IInfoCreate, value: any) => {
  //       const updated = {
  //         ...debouncedInfos,
  //         [field]: value,
  //       };

  //       setDebouncedInfos(updated);
  //       debouncedValidateRef.current(updated); // validasi dengan debounce
  //     },
  //     [debouncedInfos, setDebouncedInfos]
  //   );

  //   const addNearByField = useCallback(() => {
  //     setDebouncedInfos((prev: { near_by: any }) => ({
  //       ...prev,
  //       near_by: [...(prev.near_by || []), { name: "", distance: "" }],
  //     }));
  //   }, [setDebouncedInfos]);

  //   const handleNearByChange = useCallback(
  //     (index: number, key: keyof INearBy, value: any) => {
  //       const updatedNearBy = [...(debouncedInfos.near_by || [])];
  //       updatedNearBy[index] = {
  //         ...updatedNearBy[index],
  //         [key]: value,
  //       };

  //       const updated = {
  //         ...debouncedInfos,
  //         near_by: updatedNearBy,
  //       };

  //       setDebouncedInfos(updated);
  //       debouncedValidateRef.current(updated);
  //     },
  //     [debouncedInfos, setDebouncedInfos]
  //   );

  //   const deleteNearByField = (nearByArray: INearBy[], index: number) => {
  //     const updated = {
  //       ...debouncedInfos,
  //       near_by: nearByArray.filter((_, i) => i !== index),
  //     };

  //     setDebouncedInfos(updated);
  //     debouncedValidateRef.current(updated); // ✅
  //   };

  return (
    <>
      <Textarea
        label="Maps"
        placeholder="Masukan Maps"
        // value={debouncedInfos?.maps}
        // onChange={(e) => handleInfoChange("maps", e.target.value)} // Update saat mengetik
        // error={isSubmitAttempted && errorInfo.maps}
      />
      <NumberInput
        hideControls
        label="Harga Awal"
        placeholder="Masukan Harga Awal (Rp)"
        // value={debouncedInfos?.start_price ? `Rp. ${Number(debouncedInfos.start_price).toLocaleString("id-ID")}` : ""}
        // onChange={(value) => {
        //   handleInfoChange("start_price", Number(value) || "");
        // }}
        // thousandSeparator="."
        // decimalSeparator=","
        // prefix="Rp. "
        // required
        // error={isSubmitAttempted && errorInfo.start_price}
      />

      <Group justify="space-between">
        <Text fw={400}>Tambahkan Lokasi Terdekat</Text>
        {/* <ButtonAdd onClick={() => addNearByField()} size="2.5rem" /> */}
      </Group>
      {/* <Stack mt="md">
        {Array.isArray(debouncedInfos?.near_by) &&
          debouncedInfos?.near_by?.map((nearBy: INearBy, index: number) => (
            <Card key={index} shadow="lg" padding="lg" radius="md">
              <Group>
                <TextInput
                  label={`Nama Lokasi ${index + 1}`}
                  value={nearBy.name}
                  onChange={(e) => {
                    handleNearByChange(index, "name", e.target.value);
                  }}
                  placeholder="Masukkan Lokasi"
                  error={isSubmitAttempted && errorInfo[`near_by[${index}].name`]}
                />

                <NumberInput
                  hideControls
                  label={`Jarak ${index + 1}`}
                  value={nearBy.distance}
                  onChange={(value) => {
                    handleNearByChange(index, "distance", value ? value.toString() : "");
                  }}
                  placeholder="Masukkan Jarak"
                  error={isSubmitAttempted && errorInfo[`near_by[${index}].distance`]}
                />

                <Stack mt={20}>
                  <ButtonDelete onClick={() => deleteNearByField(debouncedInfos.near_by || [], index)} />
                </Stack>
              </Group>
            </Card>
          ))}
      </Stack> */}
    </>
  );
};

export default memo(FormEditInfo);

import ButtonAdd from "@/lib/button/buttonAdd";
import ButtonDelete from "@/lib/button/butttonDelete";
import { Card, Group, InputWrapper, Text, NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";

const FormInfo = ({ debouncedInfos, handleInfoChange, addNearByField, handleNearByChange, deleteNearByField }) => {
  return (
    <>
      <InputWrapper label="Harga Awal" required>
        <TextInput
          placeholder="Masukan Harga Awal (Rp)"
          defaultValue={debouncedInfos?.start_price ? `Rp. ${Number(debouncedInfos?.start_price).toLocaleString("id-ID")}` : ""}
          onBlur={(event) => {
            const rawValue = event.target.value.replace(/[^0-9]/g, "");
            const numericValue = rawValue === "" ? 0 : Number(rawValue);
            handleInfoChange("start_price", numericValue);

            event.target.value = numericValue ? `Rp. ${numericValue.toLocaleString("id-ID")}` : "";
          }}
        />
      </InputWrapper>

      <InputWrapper label="Maps" required>
        <Textarea
          placeholder="Masukan Maps"
          defaultValue={debouncedInfos?.maps} // Pastikan values.note sudah terdefinisi dalam Formik state
          onBlur={(e) => handleInfoChange("maps", e.target.value)} // Update saat onBlur
        />
      </InputWrapper>
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
                  value={nearBy.name || ""}
                  placeholder="Masukan Lokasi"
                  onChange={(event) => handleNearByChange(index, "name", event.currentTarget.value.toUpperCase())}
                />
                <TextInput
                  label={`Jarak ${index + 1}`}
                  value={nearBy.distance || ""}
                  placeholder="Masukan Jarak"
                  onChange={(event) => handleNearByChange(index, "distance", event.currentTarget.value.toUpperCase())}
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

export default FormInfo;

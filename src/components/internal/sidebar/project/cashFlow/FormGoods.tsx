import ButtonAdd from "@/lib/button/buttonAdd";
import ButtonDelete from "@/lib/button/butttonDelete";
import { satuan } from "@/lib/dictionary";
import { Card, Group, NumberInput, Pagination, Select, Stack, Text, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";

const FormGoods = ({ goodsData, debouncedGoods, addGoodField, handleGoodChange, deleteGoodField, totalPages, page, setPage }) => {
  return (
    <>
      <Group justify="space-between" p={20}>
        <Text fw={700}>Tambahkan Daftar Pengeluaran</Text>
        <ButtonAdd onClick={() => addGoodField()} size="3.5rem" />
      </Group>
      <Stack mt="md">
        {goodsData?.map((good: IGoods, index: number) => (
          <Card key={index} shadow="lg" padding="lg" radius="md">
            <Group>
              <TextInput
                label={`Nama Pengeluaran ${index + 1}`}
                placeholder="Masukan Pengeluaran"
                value={good.good_name.toLocaleUpperCase() || ""}
                onChange={(event) => handleGoodChange(index, "good_name", event.currentTarget.value.toLocaleUpperCase())}
                autoFocus={index === 0}
              />

              <NumberInput
                w={100}
                hideControls
                label="Kuantitas"
                placeholder="Masukan Kuantitas"
                value={good.quantity || ""}
                onChange={(value) => handleGoodChange(index, "quantity", (value as number) || 0)}
              />

              <Select
                w={100}
                label="Satuan"
                placeholder="Satuan"
                value={good.unit || ""}
                data={satuan}
                onChange={(value) => handleGoodChange(index, "unit", value || "")}
              />

              <TextInput
                w={140}
                label="Harga"
                placeholder="Masukan Harga"
                value={good.price ? `Rp. ${good.price.toLocaleString("id-ID")}` : ""}
                onChange={(event) => {
                  const rawValue = event.target.value.replace(/\D/g, "");
                  const numericValue = Number(rawValue) || 0;
                  handleGoodChange(index, "price", numericValue);
                }}
              />

              <TextInput
                w={140}
                label="Total"
                value={good.total_cost?.toLocaleString("id-ID") || "0"}
                readOnly
                styles={{ input: { fontWeight: "bold", cursor: "not-allowed" } }}
              />

              <Stack mt={20}>
                <ButtonDelete onClick={() => deleteGoodField(debouncedGoods || [], index)} />
              </Stack>
            </Group>
          </Card>
        ))}
        <Group p={20}>
          <Pagination
            total={totalPages || 1} // Jumlah total halaman
            value={page}
            onChange={setPage}
            mt="md"
          />
        </Group>
      </Stack>
    </>
  );
};

export default FormGoods;

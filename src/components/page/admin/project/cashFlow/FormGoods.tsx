import ButtonAdd from "@/components/common/button/buttonAdd";
import ButtonDelete from "@/components/common/button/butttonDelete";
import { paymentCategory, satuan } from "@/constants/dictionary";
import { Card, Group, NumberInput, Select, Stack, Text, TextInput } from "@mantine/core";
import { useFormikContext } from "formik";
import { useCallback, useEffect } from "react";

interface FormGoodsProps {
  goods: IGoodsCreate[];
  onGoodsChange: (updatedGoods: IGoodsCreate[]) => void;
  isCreateMode?: boolean;
  error?: Array<{
    good_name?: string;
    price?: string;

    unit?: string;
    quantity?: string;
    status?: string;
    total_cost?: string;
  }>;
  touched?: Array<boolean | any>;
}

const FormGoods = ({ goods, onGoodsChange, isCreateMode = false, error, touched }: FormGoodsProps) => {
  const { setFieldValue } = useFormikContext<any>();

  const createNewGood = (): IGoodsCreate => ({
    good_name: "",
    quantity: 0,
    unit: "",
    price: 0,
    total_cost: 0,
    status: "tunai",
    costs_due: 0,
    cash_flow_id: "",
  });

  const addGoodField = useCallback(() => {
    const updated = [...goods, createNewGood()].map((item) => ({
      ...item,
      total_cost: (item.quantity || 0) * (item.price || 0),
    }));

    onGoodsChange(updated);
    setFieldValue("good", updated);
  }, [goods, onGoodsChange, setFieldValue]);

  useEffect(() => {
    if (isCreateMode && goods.length === 0) {
      const initial = [createNewGood()];
      onGoodsChange(initial);
      setFieldValue("good", initial);
    }
  }, [isCreateMode, goods, onGoodsChange, setFieldValue]);

  // Fungsi untuk mengubah nilai
  const handleGoodChange = useCallback(
    (index: number, field: string, value: any) => {
      const updatedGoods = [...goods];

      // If the status is "tempo", set price to 0
      if (field === "status" && value === "tempo") {
        updatedGoods[index].price = 0; // Set price to 0 when status is "tempo"
      } else if (field === "price" && updatedGoods[index].status === "tempo") {
        return; // Prevent price update if status is "tempo"
      }

      updatedGoods[index][field] = value;

      // Hanya update total_cost untuk item yang berubah
      updatedGoods[index].total_cost = (updatedGoods[index].quantity || 0) * (updatedGoods[index].price || 0);

      setFieldValue("good", updatedGoods);
    },
    [goods, setFieldValue]
  );

  // Fungsi hapus
  const deleteGoodField = useCallback(
    (index: number) => {
      const updatedGoods = goods.filter((_, idx) => idx !== index);
      setFieldValue("good", updatedGoods);
    },
    [goods, setFieldValue]
  );

  // Tambah 1 item default kalau sedang create dan kosong
  useEffect(() => {
    if (isCreateMode && goods.length === 0) {
      const initialGood: IGoodsCreate = {
        good_name: "",
        quantity: 0,
        unit: "",
        price: 0,
        total_cost: 0,
        status: "",
        costs_due: 0,
        cash_flow_id: "",
      };
      setFieldValue("good", [initialGood]);
    }
  }, [isCreateMode, goods.length, setFieldValue]);

  return (
    <>
      <Group justify="space-between" p={20}>
        <Text fw={700}>Tambahkan Daftar Pengeluaran</Text>
        <ButtonAdd onClick={addGoodField} size="3.5rem" />
      </Group>

      <Stack mt="md">
        {goods.map((good, index) => (
          <Card key={index} shadow="lg" padding="lg" radius="md">
            <Group align="end" gap="md">
              <TextInput
                error={touched?.[index]?.good_name && error?.[index]?.good_name}
                label={`Nama Pengeluaran ${index + 1}`}
                placeholder="Masukkan Pengeluaran"
                value={good.good_name.toUpperCase() || ""}
                onChange={(e) => handleGoodChange(index, "good_name", e.currentTarget.value.toUpperCase())}
                autoFocus={index === 0}
              />

              <NumberInput
                error={touched?.[index]?.quantity && error?.[index]?.quantity}
                w={100}
                hideControls
                label="Kuantitas"
                placeholder="Masukkan Kuantitas"
                value={good.quantity || ""}
                onChange={(val) => handleGoodChange(index, "quantity", val || 0)}
              />

              <Select
                error={touched?.[index]?.unit && error?.[index]?.unit}
                w={100}
                label="Satuan"
                placeholder="Pilih Satuan"
                value={good.unit}
                data={satuan}
                onChange={(val) => handleGoodChange(index, "unit", val || "")}
              />
              <Select
                error={touched?.[index]?.status && error?.[index]?.status}
                w={100}
                label="Pembayaran"
                placeholder="Pilih Pembayaran"
                value={good.status} // default-nya "tunai"
                data={paymentCategory}
                onChange={(val) => handleGoodChange(index, "status", val || "tunai")} // fallback juga aman
              />

              <TextInput
                error={touched?.[index]?.price && error?.[index]?.price}
                w={140}
                label="Harga"
                placeholder="Masukkan Harga"
                value={good.price ? `Rp. ${good.price.toLocaleString("id-ID")}` : ""}
                onChange={(e) => {
                  const raw = e.currentTarget.value.replace(/\D/g, "");
                  const numeric = Number(raw) || 0;
                  handleGoodChange(index, "price", numeric);
                }}
              />

              <TextInput
                w={140}
                label="Total"
                value={good.total_cost?.toLocaleString("id-ID") || "0"}
                readOnly
                styles={{
                  input: {
                    fontWeight: "bold",
                    cursor: "not-allowed",
                  },
                }}
              />

              <Stack mt={20}>
                <ButtonDelete onClick={() => deleteGoodField(index)} />
              </Stack>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default FormGoods;

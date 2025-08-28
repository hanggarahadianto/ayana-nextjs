import ButtonAdd from "@/components/common/button/buttonAdd";
import ButtonDelete from "@/components/common/button/ButtonDeleteWithoutConfirmation";
import { paymentCategory, satuan } from "@/constants/dictionary";
import { Card, Group, NumberInput, Select, Stack, Text, TextInput } from "@mantine/core";
import { useFormikContext } from "formik";
import React from "react";
import { memo, useCallback, useEffect } from "react";

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
const FormGoods: React.FC<FormGoodsProps> = React.memo(({ goods, onGoodsChange, isCreateMode = false, error, touched }) => {
  const { setFieldValue } = useFormikContext<IGoodsCreate>();

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

  const handleGoodChange = (index: number, field: keyof IGoodsCreate, value: any) => {
    // Prevent price update if status is 'tempo'
    if (field === "price" && goods[index].status === "tempo") return;

    // Jika status diubah ke 'tempo', price dan total_cost jadi 0
    if (field === "status" && value === "tempo") {
      setFieldValue(`good[${index}].price`, 0);
      setFieldValue(`good[${index}].total_cost`, 0);
    }

    // Set nilai field yang berubah
    setFieldValue(`good[${index}].${field}`, value);

    // Hitung ulang total_cost jika field price/quantity berubah
    if (field === "price" || field === "quantity") {
      const price = field === "price" ? value : goods[index].price || 0;
      const quantity = field === "quantity" ? value : goods[index].quantity || 0;
      setFieldValue(`good[${index}].total_cost`, price * quantity);
    }
  };

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
        {goods.map((good, index) => {
          return (
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
                  searchable
                  error={touched?.[index]?.unit && error?.[index]?.unit}
                  w={130}
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
          );
        })}
      </Stack>
    </>
  );
});

export default memo(FormGoods);

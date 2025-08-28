import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Group, TextInput, NumberInput, Select, Card, Stack, Text } from "@mantine/core";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { satuan } from "@/constants/dictionary";
import { useFormikContext } from "formik";
import ButtonDelete from "@/components/common/button/ButtonDeleteWithoutConfirmation";

interface FormAddMaterialProps {
  materials: IMaterialCreate[];
  setMaterials: (newMaterials: IMaterialCreate[]) => void; // ubah dari Dispatch
  errors?: any; // ubah dari any[] ke any
  touched?: any;
}

const FormAddMaterial: React.FC<FormAddMaterialProps> = React.memo(({ materials, setMaterials, errors, touched }) => {
  const { setFieldValue } = useFormikContext<IWeeklyProgressCreate>();

  const amountMaterial = useMemo(() => {
    return materials.reduce((sum, worker) => sum + (worker.total_cost || 0), 0);
  }, [materials]);

  useEffect(() => {
    setFieldValue("amount_material", amountMaterial);
  }, [amountMaterial, setFieldValue]);

  const addMaterial = useCallback(() => {
    const updated = [...materials, { material_name: "", quantity: 0, unit: "", price: 0, total_cost: 0 }];
    setMaterials(updated);
  }, [materials, setMaterials]);

  // ✅ Delete material
  const deleteMaterial = useCallback(
    (index: number) => {
      const updated = materials.filter((_, i) => i !== index);
      setMaterials(updated);
    },
    [materials, setMaterials]
  );

  // ✅ Handle material field change
  const handleMaterialChange = useCallback(
    (index: number, field: keyof IMaterialCreate, value: string | number) => {
      const updated = [...materials];
      const current = { ...updated[index], [field]: value };

      // Auto-calculate total_cost when quantity or price changes
      if (field === "quantity" || field === "price") {
        const quantity = field === "quantity" ? Number(value) : Number(current.quantity);
        const price = field === "price" ? Number(value) : Number(current.price);
        current.total_cost = quantity * price;
      }

      updated[index] = current;
      setMaterials(updated);
    },
    [materials, setMaterials]
  );

  return (
    <>
      <Group justify="space-between" p={20}>
        <Text fw={600}>Tambah Material</Text>
        <ButtonAdd onClick={addMaterial} size="2.5rem" />
      </Group>
      <Stack>
        {materials.map((material, index) => (
          <Card key={index} shadow="sm" radius="md" withBorder>
            <Group>
              <TextInput
                error={touched?.[index]?.material_name && errors?.[index]?.material_name}
                label={`Nama Material ${index + 1}`}
                placeholder="Masukan Nama Material"
                value={material.material_name}
                onChange={(e) => handleMaterialChange(index, "material_name", e.target.value.toUpperCase())}
              />
              <NumberInput
                error={touched?.[index]?.quantity && errors?.[index]?.quantity}
                hideControls
                w={100}
                label="Kuantitas"
                placeholder="Masukan Kuantitas"
                value={material.quantity ? material.quantity : ""}
                onChange={(value) => handleMaterialChange(index, "quantity", (value as number) || 0)}
              />
              <Select
                searchable
                error={touched?.[index]?.unit && errors?.[index]?.unit}
                w={140}
                label="Satuan"
                placeholder="Satuan"
                value={material.unit}
                data={satuan}
                onChange={(value) => handleMaterialChange(index, "unit", value || "")}
              />
              <TextInput
                error={touched?.[index]?.price && errors?.[index]?.price}
                w={140}
                label="Harga"
                placeholder="Masukan Harga"
                value={material.price ? `Rp. ${material.price.toLocaleString("id-ID")}` : ""}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  handleMaterialChange(index, "price", Number(rawValue) || 0);
                }}
              />
              <TextInput
                label="Total"
                value={material.total_cost.toLocaleString("id-ID")}
                readOnly
                styles={{ input: { fontWeight: "bold", cursor: "not-allowed" } }}
              />
              <Stack mt={16}>
                <ButtonDelete onClick={() => deleteMaterial(index)} />
              </Stack>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
});

export default memo(FormAddMaterial);

import React, { useCallback } from "react";
import { Group, TextInput, NumberInput, Select, Card, Stack, Text } from "@mantine/core";
import ButtonAdd from "@/lib/button/buttonAdd";
import ButtonDelete from "@/lib/button/butttonDelete";
import { satuan } from "@/lib/dictionary";

interface FormAddMaterialProps {
  materials: IMaterialCreate[];
  setMaterials: React.Dispatch<React.SetStateAction<IMaterialCreate[]>>;
}

const FormAddMaterial: React.FC<FormAddMaterialProps> = ({ materials, setMaterials }) => {
  const addMaterial = useCallback(() => {
    setMaterials((prev) => [...prev, { material_name: "", quantity: 0, unit: "", price: 0, total_cost: 0 }]);
  }, [setMaterials]);

  const deleteMaterial = useCallback(
    (index: number) => {
      setMaterials((prev) => prev.filter((_, i) => i !== index));
    },
    [setMaterials]
  );

  const handleMaterialChange = useCallback(
    <T extends keyof IMaterialCreate>(index: number, field: T, value: IMaterialCreate[T]) => {
      setMaterials((prev) => {
        const newMaterials = [...prev];
        newMaterials[index] = { ...newMaterials[index], [field]: value };

        if (field === "quantity" || field === "price") {
          const quantity = Number(newMaterials[index].quantity) || 0;
          const price = Number(newMaterials[index].price) || 0;
          newMaterials[index].total_cost = quantity * price;
        }
        return newMaterials;
      });
    },
    [setMaterials]
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
                label={`Nama Material ${index + 1}`}
                placeholder="Masukan Nama Material"
                value={material.material_name}
                onChange={(e) => handleMaterialChange(index, "material_name", e.target.value.toUpperCase())}
              />
              <NumberInput
                hideControls
                w={100}
                label="Kuantitas"
                placeholder="Masukan Kuantitas"
                value={material.quantity ? material.quantity : ""}
                onChange={(value) => handleMaterialChange(index, "quantity", (value as number) || 0)}
              />
              <Select
                w={140}
                label="Satuan"
                placeholder="Satuan"
                value={material.unit}
                data={satuan}
                onChange={(value) => handleMaterialChange(index, "unit", value || "")}
              />
              <TextInput
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
              <ButtonDelete onClick={() => deleteMaterial(index)} />
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default FormAddMaterial;

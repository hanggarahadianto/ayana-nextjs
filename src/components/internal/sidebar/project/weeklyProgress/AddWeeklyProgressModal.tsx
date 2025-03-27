"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Card, Text, Stack, NumberInput, Divider, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import { useSubmitWeeklyProgressForm } from "@/api/weekly-progress/postDataWeeklyProgress";
import ButtonAdd from "@/components/button/buttonAdd";
import ButtonDelete from "@/components/button/butttonDelete";
import { satuan } from "@/lib/satuan";
import { initialValueWeeklyProgressCreate, validationSchemaWeeklyProgressCreate } from "@/lib/initialValues/initialValuesWeeklyProgress";
import { allWeeks } from "@/lib/weeks";

// Define types
interface IWorkerCreate {
  worker_name: string;
  position: string;
}
interface IMaterialCreate {
  material_name: string;
  quantity: number;
  unit: string;
  price: number;
  total_cost: number;
}
interface IWeeklyProgressCreate {
  week_number: string;
  percentage: string;
  note: string;
  worker: IWorkerCreate[];
  material: IMaterialCreate[];
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const AddWeeklyProgressModal = ({
  projectId,
  refetchWeeklyProgressData,
  weeklyProgress = [],
}: {
  projectId: string;
  refetchWeeklyProgressData: () => void;
  weeklyProgress?: any[];
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postData, isPending: isLoading } = useSubmitWeeklyProgressForm(refetchWeeklyProgressData, close);

  const [workers, setWorkers] = useState<IWorkerCreate[]>(() => initialValueWeeklyProgressCreate.worker);
  const [materials, setMaterials] = useState<IMaterialCreate[]>(() => initialValueWeeklyProgressCreate.material);
  const [workerCount, setWorkerCount] = useState(0);
  const [materialCost, setMaterialCost] = useState(0);

  console.log(workers, materials);

  // Debounce the workers and materials state
  const debouncedWorkers = useDebounce(workers, 1200);
  const debouncedMaterials = useDebounce(materials, 1200);

  // Memoize available weeks
  const availableWeeks = useMemo(() => {
    const selectedWeeks = new Set(weeklyProgress.map((item) => item.week_number));
    return allWeeks.filter((week) => !selectedWeeks.has(week)).map((week) => ({ value: week, label: week }));
  }, [weeklyProgress]);

  // Calculate worker count and material cost with debounced values
  useEffect(() => {
    setWorkerCount(debouncedWorkers.filter((w) => w.worker_name.trim() !== "").length);
  }, [debouncedWorkers]);

  useEffect(() => {
    setMaterialCost(debouncedMaterials.reduce((acc, m) => acc + (m.total_cost || 0), 0));
  }, [debouncedMaterials]);

  const handleSubmit = useCallback(
    (values: IWeeklyProgressCreate) => {
      const formData = { ...values, project_id: projectId, worker: workers, material: materials };
      postData(formData);
    },
    [workers, materials, projectId, postData]
  );

  const addWorker = useCallback(() => {
    setWorkers((prev) => [...prev, { worker_name: "", position: "" }]);
  }, []);

  const deleteWorker = useCallback((index: number) => {
    setWorkers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addMaterial = useCallback(() => {
    setMaterials((prev) => [...prev, { material_name: "", quantity: 0, unit: "", price: 0, total_cost: 0 }]);
  }, []);

  const deleteMaterial = useCallback((index: number) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleWorkerChange = useCallback((index: number, field: keyof IWorkerCreate, value: string) => {
    setWorkers((prev) => {
      const newWorkers = [...prev];
      newWorkers[index] = { ...newWorkers[index], [field]: value };
      return newWorkers;
    });
  }, []);
  const handleMaterialChange = useCallback(<T extends keyof IMaterialCreate>(index: number, field: T, value: IMaterialCreate[T]) => {
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
  }, []);

  return (
    <>
      <ButtonAdd onClick={open} size="3.5rem" />
      <Modal opened={opened} onClose={close} size="100%" yOffset="100px">
        <Formik
          initialValues={initialValueWeeklyProgressCreate}
          validationSchema={validationSchemaWeeklyProgressCreate}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <SimpleGrid p={20}>
                <Text fw={900} size="xl">
                  Tambah Progress Mingguan
                </Text>

                <Select
                  mt={2}
                  w={200}
                  label="Minggu Ke"
                  placeholder="Pilih Minggu"
                  data={availableWeeks}
                  value={values.week_number}
                  onChange={(value) => setFieldValue("week_number", value)}
                  error={touched.week_number && errors.week_number}
                  required
                />

                <Divider />
                <Group justify="space-between" p={20}>
                  <Text fw={600}>Tambah Pekerja</Text>
                  <ButtonAdd onClick={addWorker} size="2.5rem" />
                </Group>
                <Stack>
                  {workers.map((worker, index) => {
                    console.log(worker);
                    return (
                      <Card key={index} shadow="sm" radius="md" withBorder>
                        <Group>
                          <TextInput
                            label={`Nama Pekerja ${index + 1}`}
                            placeholder="Masukan nama pekerja"
                            value={worker.worker_name || ""} // Fallback to empty string
                            onChange={(e) => handleWorkerChange(index, "worker_name", e.target.value.toLocaleUpperCase())}
                          />
                          <Select
                            label={`Posisi Pekerja ${index + 1}`}
                            placeholder="Pilih posisi"
                            value={worker.position || ""}
                            onChange={(value) => handleWorkerChange(index, "position", value || "")}
                            data={[
                              { value: "tukang", label: "Tukang" },
                              { value: "kuli", label: "Kuli" },
                            ]}
                            allowDeselect
                            onFocus={() => console.log(`Select value for worker ${index}:`, worker.position)} // Debug on focus
                          />

                          <ButtonDelete onClick={() => deleteWorker(index)} />
                        </Group>
                      </Card>
                    );
                  })}
                </Stack>

                <Group p={20}>
                  <Text size="xl" fw={800}>
                    Total Pekerja
                  </Text>
                  <Text fw={800}>{workerCount}</Text>
                </Group>

                <Divider />
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
                          value={material.quantity}
                          onChange={(value) => handleMaterialChange(index, "quantity", value as number)}
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

                <Group p={20}>
                  <Text size="xl" fw={900}>
                    Total Biaya Material
                  </Text>
                  <Text fw={800}>
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(materialCost)}
                  </Text>
                </Group>

                <Divider />
                <NumberInput
                  w={200}
                  label="Persentase Pengerjaan"
                  placeholder="Persentase"
                  value={Number(values.percentage) || undefined}
                  onChange={(value) => setFieldValue("percentage", String(value))}
                  error={touched.percentage && errors.percentage}
                  rightSection={
                    <Text size="sm" c="gray">
                      %
                    </Text>
                  }
                  required
                />
                <Textarea
                  label="Note"
                  value={values.note}
                  placeholder="Enter additional information"
                  onChange={(e) => setFieldValue("note", e.target.value.toUpperCase())}
                  mt="md"
                />

                <Group justify="flex-end" mt="md">
                  <Button onClick={close} variant="default" disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" color="blue" loading={isLoading || isSubmitting}>
                    Tambah
                  </Button>
                </Group>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddWeeklyProgressModal;

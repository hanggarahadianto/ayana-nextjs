"use client";
import React, { useEffect } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Card, Text, Stack, NumberInput, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";

import { useUpdateWeeklyProgressForm } from "@/api/weekly-progress/editDataWeeklyProgress";
import ButtonAdd from "@/components/button/buttonAdd";
import ButtonDelete from "@/components/button/butttonDelete";
import { satuan } from "@/lib/satuan";
import { getInitialValuesUpdateWeeklyProgress } from "@/lib/initialValues/initialValuesWeeklyProgress";

const EditWeeklyProgressModal = ({
  projectId,
  refetchWeeklyProgressData,
  initialData,
  onClose,
}: {
  projectId: any;
  refetchWeeklyProgressData: () => void;
  initialData: IWeeklyProgressUpdate;
  onClose: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  console.log("initialData", initialData);

  const { mutate: updateData, isPending: isLoadingSubmitProjectData } = useUpdateWeeklyProgressForm(refetchWeeklyProgressData, close);

  const handleSubmit = (values: IWeeklyProgressUpdate) => {
    const formData = { ...values, id: initialData?.id, amount_worker: values?.worker?.length, project_id: projectId };

    console.log("Form values submitted:", formData);

    updateData(formData);
  };

  useEffect(() => {
    if (initialData) {
      open();
    }
  }, [initialData]);

  return (
    <>
      <Modal opened={opened} onClose={onClose} size={"60%"} yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdateWeeklyProgress(initialData)}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            console.log("VALUES", values);

            console.log("VALUES PEKERJA", values.worker.length);

            // worker
            const addWorkerField = () => {
              const newWorker: IWorkerCreate = { worker_name: "", position: "", total_cost: 0 };
              setFieldValue("worker", [...values.worker, newWorker]);
            };

            const deleteWorkerField = (worker: IWorkerCreate[], index: number) => {
              const updatedWorkers = worker.filter((_, i) => i !== index);
              console.log("UPDATE WORKER", updatedWorkers);
              setFieldValue("worker", updatedWorkers);
            };

            const handleWorkerChange = <T extends keyof IWorkerCreate>(index: number, field: T, value: IWorkerCreate[T]) => {
              console.log("Updating worker:", index, field, value); // Log the update
              const updatedWorkers = [...values.worker];
              updatedWorkers[index][field] = value;
              setFieldValue("worker", updatedWorkers); // Update Formik state
            };

            const addMaterialField = (material: IMaterialCreate[]) => {
              const newMaterial: IMaterialCreate = {
                material_name: "",
                quantity: 0,
                unit: "",
                price: 0,
                total_cost: 0,
              };
              setFieldValue("material", [...material, newMaterial]);
            };

            const deleteMaterialField = (worker: IMaterialCreate[], index: number) => {
              const updatedMaterials = worker.filter((_, i) => i !== index);

              // Recalculate the total cost after deletion
              const totalCost = updatedMaterials.reduce((acc, material) => acc + (material.total_cost || 0), 0);

              // Update state
              setFieldValue("material", updatedMaterials);
              setFieldValue("amount_material", totalCost); // ✅ Ensure totalCost is updated
            };

            const handleMaterialChange = <T extends keyof IMaterialCreate>(index: number, field: T, value: IMaterialCreate[T]) => {
              const updatedMaterial = [...values.material];

              // Update the changed field
              updatedMaterial[index][field] = value;

              // Recalculate total_cost when quantity or price is updated
              if (field === "quantity" || field === "price") {
                const quantity = Number(updatedMaterial[index].quantity) || 0;
                const price = Number(updatedMaterial[index].price) || 0;
                updatedMaterial[index].total_cost = quantity * price; // Calculate total cost
              }

              // Recalculate the total amount for all materials
              const totalCost = updatedMaterial.reduce((acc, material) => acc + (material.total_cost || 0), 0);

              setFieldValue("material", updatedMaterial);
              setFieldValue("amount_material", totalCost);
            };

            return (
              <>
                <Form>
                  <SimpleGrid p={20}>
                    <Text fw={900} size="xl">
                      Ubah Progress Mingguan
                    </Text>
                    <Select
                      w={200}
                      mt={20}
                      label="Minggu Ke"
                      placeholder="Pilih Minggu"
                      onChange={(value: any) => {
                        setFieldValue("week_number", value);
                      }}
                      value={values?.week_number}
                      data={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                      ]}
                      required
                    />
                    <Stack mt="md">
                      <Group justify="space-between" p={20}>
                        <Text>Ubah Pekerja</Text>
                        <ButtonAdd onClick={() => addWorkerField()} size={"xl"} />
                      </Group>
                      {values.worker.map((worker: IWorkerCreate, index: number) => (
                        <Card key={index} shadow="sm" padding="lg" radius="md">
                          <Group>
                            <TextInput
                              label={`Nama Pekerja ${index + 1}`}
                              placeholder="Masukkan nama pekerja"
                              value={worker.worker_name || ""}
                              onChange={(e) => handleWorkerChange(index, "worker_name", e.target.value)}
                            />
                            <Select
                              label={`Posisi Pekerja ${index + 1}`}
                              placeholder="Pilih posisi"
                              value={worker.position || ""}
                              data={[
                                { value: "Tukang", label: "Tukang" },
                                { value: "Kuli", label: "Kuli" },
                              ]}
                              onChange={(value) => handleWorkerChange(index, "position", value || "")}
                            />

                            <ButtonDelete onClick={() => deleteWorkerField(values.worker, index)} />
                          </Group>
                        </Card>
                      ))}
                    </Stack>

                    <Stack mt="md">
                      <Group justify="space-between" p={20}>
                        <Text>Ubah Material</Text>
                        <ButtonAdd onClick={() => addMaterialField(values.material)} size={"xl"} />
                      </Group>
                      {values.material.map((material: IMaterialCreate, index: number) => {
                        return (
                          <Card key={index} shadow="sm" padding="lg" radius="md">
                            <Group>
                              <TextInput
                                label={`Nama Material ${index + 1}`}
                                placeholder="Masukan Nama Material"
                                value={material.material_name || ""}
                                onChange={(event) => handleMaterialChange(index, "material_name", event.currentTarget.value)}
                              />
                              <NumberInput
                                hideControls
                                w={100}
                                label={"Kuantitas"}
                                placeholder="Masukan Kuantitas"
                                value={material.quantity || ""}
                                onChange={(value) => handleMaterialChange(index, "quantity", (value as number) || 0)}
                              />
                              <Select
                                w={140}
                                label={"Satuan"}
                                placeholder="Satuan"
                                value={material.unit || ""}
                                data={satuan}
                                onChange={(value) => handleMaterialChange(index, "unit", value || "")}
                              />

                              <TextInput
                                w={140}
                                label="Harga"
                                placeholder="Masukan Harga"
                                value={material.price ? `Rp. ${material.price.toLocaleString("id-ID")}` : ""}
                                onChange={(event) => {
                                  const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                  const numericValue = Number(rawValue) || 0;
                                  handleMaterialChange(index, "price", numericValue); // Store as number
                                }}
                              />

                              <TextInput
                                label={"Total"}
                                value={material.total_cost?.toLocaleString("id-ID") || "0"} // Format as currency if needed
                                readOnly
                                styles={{ input: { fontWeight: "bold", cursor: "not-allowed" } }} // Light background to indicate it's view-only
                              />

                              <ButtonDelete onClick={() => deleteMaterialField(values.material, index)} />
                            </Group>
                          </Card>
                        );
                      })}
                      <Group p={20}>
                        <Text size="xl" fw={800}>
                          Total Biaya Material
                        </Text>
                        <Text fw={800} ml={20}>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(values.amount_material || 0)}
                        </Text>
                      </Group>

                      <NumberInput
                        w={160}
                        hideControls
                        label="Persentase"
                        placeholder="Persentase"
                        value={values.percentage ? String(values.percentage) : ""}
                        onChange={(value) => setFieldValue("percentage", value ? String(value) : "")}
                        rightSection={
                          <Text size="sm" c="gray">
                            %
                          </Text>
                        }
                      />
                    </Stack>
                    <Textarea
                      label="Note"
                      placeholder="Enter additional information"
                      value={values?.note}
                      onChange={(event) => setFieldValue("note", event.currentTarget.value)}
                      mt="md"
                    />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" color="blue">
                        Update
                      </Button>
                    </Group>
                  </SimpleGrid>
                </Form>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default EditWeeklyProgressModal;

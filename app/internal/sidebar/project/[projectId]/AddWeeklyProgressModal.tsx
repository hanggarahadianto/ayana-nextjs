import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  Textarea,
  Card,
  Text,
  Stack,
  NumberInput,
  Divider,
  SimpleGrid,
  InputWrapper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { useSubmitWeeklyProgressForm } from "@/src/api/weekly-progress/postDataWeeklyProgress";
import { initialValueWeeklyProgressCreate, validationSchemaWeeklyProgressCreate } from "./initialValuesWeeklyProgress";
import ButtonAdd from "@/src/components/button/buttonAdd";
import ButtonDelete from "@/src/components/button/butttonDelete";
import { satuan } from "@/src/lib/satuan";

const AddWeeklyProgressModal = ({ projectId, refetchWeeklyProgressData }: { projectId: any; refetchWeeklyProgressData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitWeeklyProgressForm(refetchWeeklyProgressData, close);

  const handleSubmit = (values: IWeeklyProgressCreate) => {
    const formData = { ...values, project_id: projectId };

    console.log("Form values submitted:", formData);

    postData(formData);
  };

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal yOffset="100px" opened={opened} onClose={close} size={"70%"}>
        <Formik
          initialValues={initialValueWeeklyProgressCreate}
          validationSchema={validationSchemaWeeklyProgressCreate}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            console.log(values);
            // console.log("ERROR", errors);

            const addWorkerField = (worker: IWorkerCreate[]) => {
              const newWorker: IWorkerCreate = {
                worker_name: "",
                position: "",
              };
              setFieldValue("worker", [...worker, newWorker]);
            };

            const deleteWorkerField = (worker: IWorkerCreate[], index: number) => {
              // Remove the selected worker
              const updatedWorkers = worker.filter((_, i) => i !== index);

              // Calculate the total based on the number of remaining workers
              const totalWorkerCount = updatedWorkers.length; // This is the total based on how many workers are left

              // Update the state
              setFieldValue("worker", updatedWorkers);
              setFieldValue("amount_worker", totalWorkerCount); // Update total worker count
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
              // Remove the selected material
              const updatedMaterials = worker.filter((_, i) => i !== index);

              // Recalculate the total cost after deletion
              const totalCost = updatedMaterials.reduce((acc, material) => acc + (material.total_cost || 0), 0);

              // Update state
              setFieldValue("material", updatedMaterials);
              setFieldValue("amount_material", totalCost); // ✅ Ensure totalCost is updated
            };

            const handleWorkerChange = (index: number, field: keyof IWorkerCreate, value: string) => {
              const updatedWorkers = [...values.worker];
              updatedWorkers[index][field] = value;

              // Update workers array with the new value
              setFieldValue("worker", updatedWorkers);

              const totalWorkers = updatedWorkers.filter((worker) => worker.worker_name.trim() !== "").length;
              setFieldValue("amount_worker", totalWorkers);
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

              console.log("Updated Material:", updatedMaterial);
              console.log("Total Cost:", totalCost);

              setFieldValue("material", updatedMaterial);
              setFieldValue("amount_material", totalCost);
            };

            return (
              <>
                <Form>
                  <SimpleGrid p={20}>
                    <Text fw={900} size="xl">
                      Tambah Progress Mingguan
                    </Text>
                    <InputWrapper required error={touched.week_number && errors.week_number ? errors.week_number : undefined}>
                      <Select
                        mt={22}
                        w={200}
                        label="Minggu Ke"
                        placeholder="Pilih Minggu"
                        onChange={(value: any) => {
                          setFieldValue("week_number", value);
                        }}
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
                    </InputWrapper>

                    <Divider mt={20} />
                    <Group justify="space-between" mt={20} p={20}>
                      <Text fw={600}>Tambah Pekerja</Text>

                      <ButtonAdd onClick={() => addWorkerField(values.worker)} size={"2.5rem"} />
                    </Group>

                    <Stack mt="md">
                      {values.worker.map((worker: IWorkerCreate, index: number) => (
                        <Card key={index} shadow="sm" padding="lg" radius="md">
                          <Group>
                            <TextInput
                              label={`Nama Pekerja ${index + 1}`}
                              placeholder="Masukan nama pekerja"
                              value={worker.worker_name} // Ensure value is correctly bound
                              onChange={(event) => handleWorkerChange(index, "worker_name", event.currentTarget.value)} // Update the worker_name
                            />
                            <Select
                              label={`Posisi Pekerja ${index + 1}`}
                              placeholder="Pilih posisi"
                              value={worker.position || ""}
                              onChange={(value) => handleWorkerChange(index, "position", value || "")}
                              data={[
                                { value: "Tukang", label: "Tukang" },
                                { value: "Kuli", label: "Kuli" },
                              ]}
                            />
                            <ButtonDelete onClick={() => deleteWorkerField(values.worker, index)} />
                          </Group>
                        </Card>
                      ))}
                    </Stack>
                    <Group p={20}>
                      <Text size="xl" fw={800}>
                        Total Pekerja
                      </Text>
                      <Text fw={800} ml={20}>
                        {values.amount_worker}
                      </Text>
                    </Group>

                    <Divider mt={40} />
                    <Group justify="space-between" mt={20} p={20}>
                      <Text fw={600}>Tambah Material</Text>
                      <ButtonAdd onClick={() => addMaterialField(values.material)} size={"2.5rem"} />
                    </Group>

                    <Stack mt="md">
                      {values.material.map((material: IMaterialCreate, index: any) => (
                        <Card key={index} shadow="sm" padding="lg" radius="md">
                          <Group>
                            <TextInput
                              label={`Nama Material ${index + 1}`}
                              placeholder="Masukan Nama Material"
                              value={material.material_name || ""}
                              onChange={(event) => handleMaterialChange(index, "material_name", event.currentTarget.value)}
                            />
                            <Select
                              w={100}
                              label={"Satuan"}
                              placeholder="Satuan"
                              value={material.unit || ""}
                              data={satuan}
                              onChange={(value) => handleMaterialChange(index, "unit", value || "")}
                            />

                            <NumberInput
                              w={140}
                              hideControls
                              label={"Kuantitas"}
                              placeholder="Masukan Kuantitas"
                              value={material.quantity || ""}
                              onChange={(value) => handleMaterialChange(index, "quantity", (value as number) || 0)}
                            />

                            <NumberInput
                              w={140}
                              hideControls
                              label={"Harga"}
                              placeholder="Masukan Harga"
                              value={material.price || ""}
                              onChange={(value) => handleMaterialChange(index, "price", (value as number) || 0)}
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
                      ))}
                      <Group p={20}>
                        <Text size="xl" fw={900}>
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

                      <Divider mt={20} />

                      <InputWrapper
                        label="Persentase Pengerjaan"
                        required
                        error={touched.percentage && errors.percentage ? errors.percentage : undefined}
                      >
                        <NumberInput
                          w={160}
                          hideControls
                          placeholder="Persentase"
                          value={values.percentage ? String(values.percentage) : ""} // Ensure value is a string
                          onChange={
                            (value) => setFieldValue("percentage", value ? String(value) : "") // Convert value to string before saving
                          }
                          rightSection={
                            <Text size="sm" c="gray">
                              %
                            </Text>
                          }
                        />
                      </InputWrapper>
                    </Stack>
                    <Textarea
                      label="Note"
                      placeholder="Enter additional information"
                      onChange={(event) => setFieldValue("note", event.currentTarget.value)}
                      mt="md"
                    />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" color="blue">
                        Tambah
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

export default AddWeeklyProgressModal;

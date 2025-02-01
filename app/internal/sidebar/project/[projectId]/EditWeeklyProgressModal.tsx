import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Card, Text, Stack, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { useUpdateWeeklyProgressForm } from "@/src/api/weekly-progress/editDataWeeklyProgress";
import ButtonAdd from "@/src/components/button/buttonAdd";
import ButtonDelete from "@/src/components/button/butttonDelete";

const EditWeeklyProgressModal = ({
  projectId,
  refetchWeeklyProgressData,
  initialData,
  onClose,
}: {
  projectId: any;
  refetchWeeklyProgressData: () => void;
  initialData: IWeeklyProgressUpdate; // The existing data to pre-fill the form
  onClose: () => void; // Define onClose prop type
}) => {
  const [opened, { open }] = useDisclosure(false);

  console.log(initialData);

  const { mutate: updateData, isPending: isLoadingSubmitProjectData } = useUpdateWeeklyProgressForm(refetchWeeklyProgressData, close);

  const handleSubmit = (values: IWeeklyProgressUpdate) => {
    // Add project_id to the values object before submitting
    const formData = { ...values, id: initialData?.id, project_id: projectId };

    console.log("Form values submitted:", formData);

    updateData(formData);
  };

  useEffect(() => {
    // Open the modal when initialData is available
    if (initialData) {
      open();
    }
  }, [initialData]);

  return (
    <>
      <Modal opened={opened} onClose={onClose} size={"55rem"} yOffset="100px">
        <Formik
          initialValues={initialData}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            console.log(values);

            const addWorkerField = (worker: IWorkerCreate[]) => {
              const newWorker: IWorkerCreate = {
                worker_name: "",
                position: "",
              };
              setFieldValue("worker", [...worker, newWorker]);
            };

            const deleteWorkerField = (worker: IWorker[], index: number) => {
              const updatedWorkers = worker.filter((_, i) => i !== index);
              setFieldValue("worker", updatedWorkers);
            };

            const addMaterialField = (material: IMaterialCreate[]) => {
              const newMaterial: IMaterialCreate = {
                material_name: "",
                quantity: 0,
                total_cost: 0,
              };
              setFieldValue("material", [...material, newMaterial]);
            };

            const deleteMaterialField = (worker: IMaterial[], index: number) => {
              const updatedMaterials = worker.filter((_, i) => i !== index);
              setFieldValue("material", updatedMaterials);
            };

            const handleWorkerChange = <T extends keyof IWorker>(index: number, field: T, value: IWorker[T]) => {
              const updatedWorkers = [...values.worker];
              updatedWorkers[index][field] = value;
              setFieldValue("worker", updatedWorkers);

              const totalWorkers = updatedWorkers.filter((worker) => worker.worker_name.trim() !== "").length;
              setFieldValue("amount_worker", totalWorkers);
            };

            const handleMaterialChange = <T extends keyof IMaterial>(index: number, field: T, value: IMaterial[T]) => {
              const updatedMaterial = [...values.material];
              updatedMaterial[index][field] = value;

              const totalCost = updatedMaterial.reduce((acc, material) => acc + (material.total_cost || 0), 0);

              setFieldValue("material", updatedMaterial);
              setFieldValue("amount_material", totalCost);
            };

            return (
              <>
                <Form>
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
                      <ButtonAdd onClick={() => addWorkerField(values.worker)} size={"xl"} />
                    </Group>
                    {values.worker.map((worker: IWorker, index: number) => (
                      <Card key={worker.id} shadow="sm" padding="lg" radius="md">
                        <Group>
                          <TextInput
                            label={`Nama Pekerja ${index + 1}`}
                            placeholder="Masukan nama pekerja"
                            value={worker.worker_name || ""}
                            onChange={(event) => handleWorkerChange(index, "worker_name", event.currentTarget.value)}
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

                  <Stack mt="md">
                    <Group justify="space-between" p={20}>
                      <Text>Ubah Material</Text>
                      <ButtonAdd onClick={() => addMaterialField(values.material)} size={"xl"} />
                    </Group>
                    {values.material.map((material: IMaterial, index: number) => (
                      <Card key={material.id} shadow="sm" padding="lg" radius="md">
                        <Group>
                          <TextInput
                            label={`Nama Material ${index + 1}`}
                            placeholder="Masukan Nama Material"
                            value={material.material_name || ""}
                            onChange={(event) => handleMaterialChange(index, "material_name", event.currentTarget.value)}
                          />
                          <NumberInput
                            hideControls
                            label={"Kuantitas"}
                            placeholder="Masukan Kuantitas"
                            value={material.quantity || ""}
                            onChange={(value) => handleMaterialChange(index, "quantity", (value as number) || 0)}
                          />
                          <NumberInput
                            hideControls
                            label={"Total"}
                            placeholder="Masukan Total"
                            value={material.total_cost || ""}
                            onChange={(value) => handleMaterialChange(index, "total_cost", (value as number) || 0)}
                          />

                          <ButtonDelete onClick={() => deleteMaterialField(values.material, index)} />
                        </Group>
                      </Card>
                    ))}
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

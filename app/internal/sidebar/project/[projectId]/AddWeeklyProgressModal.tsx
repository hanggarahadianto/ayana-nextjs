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
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { useSubmitWeeklyProgressForm } from "@/src/api/weekly-progress/postDataWeeklyProgress";
import { initialValueWeeklyProgressCreate } from "./initialValuesWeeklyProgress";
import { IconPlus } from "@tabler/icons-react";

const AddWeeklyProgressModal = ({
  projectId,
  refetchWeeklyProgressData,
}: {
  projectId: any;
  refetchWeeklyProgressData: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitProjectData } =
    useSubmitWeeklyProgressForm(refetchWeeklyProgressData, close);

  const handleSubmit = (values: IWeeklyProgressCreate) => {
    // Add project_id to the values object before submitting
    const formData = { ...values, project_id: projectId };

    console.log("Form values submitted:", formData);

    postData(formData);
  };

  return (
    <>
      <ActionIcon
        onClick={open}
        size="3.5rem" // Bigger size
        radius="xl"
        variant="gradient"
        gradient={{ from: "green", to: "lime", deg: 90 }}
      >
        <IconPlus size="1.5rem" /> {/* Adjust icon size */}
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title="Tambah Progress Mingguan"
        size={"55rem"}
      >
        <Formik
          initialValues={initialValueWeeklyProgressCreate}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue }) => {
            console.log(values);

            const addWorkerField = (worker: IWorker[]) => {
              const newWorker: IWorker = {
                worker_name: "",
                position: "",
              };
              setFieldValue("worker", [...worker, newWorker]);
            };

            const deleteWorkerField = (worker: IWorker[], index: number) => {
              const updatedWorkers = worker.filter((_, i) => i !== index);
              setFieldValue("worker", updatedWorkers);
            };

            const addMaterialField = (material: IMaterial[]) => {
              const newMaterial: IMaterial = {
                material_name: "",
                quantity: 0,
                total_cost: 0,
              };
              setFieldValue("material", [...material, newMaterial]);
            };

            const deleteMaterialField = (
              worker: IMaterial[],
              index: number
            ) => {
              const updatedMaterials = worker.filter((_, i) => i !== index);
              setFieldValue("material", updatedMaterials);
            };

            const handleWorkerChange = <T extends keyof IWorker>(
              index: number,
              field: T,
              value: IWorker[T]
            ) => {
              // Clone the worker array
              const updatedWorkers = [...values.worker];
              // Safely update the worker's field
              updatedWorkers[index][field] = value;
              // Update the worker state
              setFieldValue("worker", updatedWorkers);

              // Recalculate amount_worker (if needed)
              const totalWorkers = updatedWorkers.filter(
                (worker) => worker.worker_name.trim() !== ""
              ).length;
              setFieldValue("amount_worker", totalWorkers);
            };

            const handleMaterialChange = <T extends keyof IMaterial>(
              index: number,
              field: T,
              value: IMaterial[T]
            ) => {
              const updatedMaterial = [...values.material];
              updatedMaterial[index][field] = value;

              // Recalculate the total cost for all materials
              const totalCost = updatedMaterial.reduce(
                (acc, material) => acc + (material.total_cost || 0),
                0
              );

              // Update the state
              setFieldValue("material", updatedMaterial);
              setFieldValue("amount_material", totalCost);
            };

            return (
              <>
                <Form>
                  <Select
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
                  <Stack mt="md">
                    {values.worker.map((worker: any, index: any) => (
                      <Card key={index} shadow="sm" padding="lg" radius="md">
                        <div key={index}>
                          <Group>
                            <TextInput
                              label={`Nama Pekerja ${index + 1}`}
                              placeholder="Masukan nama pekerja"
                              value={worker.worker_name || ""}
                              onChange={(event) =>
                                handleWorkerChange(
                                  index,
                                  "worker_name",
                                  event.currentTarget.value
                                )
                              }
                            />
                            <Select
                              label={`Posisi Pekerja ${index + 1}`}
                              placeholder="Pilih posisi"
                              value={worker.position || ""}
                              onChange={(value) =>
                                handleWorkerChange(
                                  index,
                                  "position",
                                  value || ""
                                )
                              }
                              data={[
                                { value: "Tukang", label: "Tukang" },
                                { value: "Kuli", label: "Kuli" },
                              ]}
                            />
                            <Button
                              color="red"
                              onClick={() =>
                                deleteWorkerField(values.worker, index)
                              }
                              mt="23"
                            >
                              Hapus Pekerja
                            </Button>
                          </Group>
                        </div>
                      </Card>
                    ))}
                    <Button
                      onClick={() => addWorkerField(values.worker)}
                      mt="sm"
                      variant="light"
                    >
                      Tambah Pekerja
                    </Button>
                  </Stack>

                  <Stack mt="md">
                    {values.material.map((material: any, index: any) => (
                      <Card key={index} shadow="sm" padding="lg" radius="md">
                        <div key={index}>
                          <Group>
                            <TextInput
                              label={`Nama Material ${index + 1}`}
                              placeholder="Masukan Nama Material"
                              value={material.material_name || ""}
                              onChange={(event) =>
                                handleMaterialChange(
                                  index,
                                  "material_name",
                                  event.currentTarget.value
                                )
                              }
                            />
                            <NumberInput
                              hideControls
                              label={"Kuantitas"}
                              placeholder="Masukan Kuantitas"
                              value={material.quantity || ""}
                              onChange={(value) =>
                                handleMaterialChange(
                                  index,
                                  "quantity",
                                  (value as number) || 0
                                )
                              }
                            />

                            <NumberInput
                              hideControls
                              label={"Total"}
                              placeholder="Masukan Total"
                              value={material.total_cost || ""}
                              onChange={(value) =>
                                handleMaterialChange(
                                  index,
                                  "total_cost",
                                  (value as number) || 0
                                )
                              }
                            />
                            <Button
                              color="red"
                              onClick={() =>
                                deleteMaterialField(values.material, index)
                              }
                              mt="23"
                            >
                              Hapus Material
                            </Button>
                          </Group>
                        </div>
                      </Card>
                    ))}
                    <Group p={20}>
                      <Text fw={800}>Total Biaya Material</Text>
                      <Text fw={800} ml={20}>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(values.amount_material || 0)}
                      </Text>
                    </Group>

                    <Button
                      onClick={() => addMaterialField(values.material)}
                      mt="sm"
                      variant="light"
                    >
                      Tambah Material
                    </Button>
                    <NumberInput
                      w={160}
                      hideControls
                      label="Persentase"
                      placeholder="Persentase"
                      value={values.percentage ? String(values.percentage) : ""} // Ensure value is a string
                      onChange={
                        (value) =>
                          setFieldValue(
                            "percentage",
                            value ? String(value) : ""
                          ) // Convert value to string before saving
                      }
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
                    onChange={(event) =>
                      setFieldValue("note", event.currentTarget.value)
                    }
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

import React, { useMemo, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Modal, Button, Group, Select, Textarea, Card, Text, Stack, NumberInput, Divider, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form } from "formik";
import { useSubmitWeeklyProgressForm } from "@/api/weekly-progress/postDataWeeklyProgress";
import ButtonAdd from "@/lib/button/buttonAdd";
import { initialValueWeeklyProgressCreate, validationSchemaWeeklyProgressCreate } from "@/lib/initialValues/initialValuesWeeklyProgress";
import { allWeeks } from "@/lib/weeks";
import FormAddWorker from "./FormAddWorker";
import FormAddMaterial from "./FormAddMaterial";

const AddWeeklyProgressModal = ({ projectId, refetchWeeklyProgressData, weeklyProgress = [] as IWeeklyProgress[] }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postData, isPending: isLoading } = useSubmitWeeklyProgressForm(refetchWeeklyProgressData, close);

  const [workers, setWorkers] = useState(initialValueWeeklyProgressCreate.worker);
  console.log("Workers", workers);
  const [materials, setMaterials] = useState(initialValueWeeklyProgressCreate.material);

  // Filter minggu yang belum dipilih
  const availableWeeks = useMemo(() => {
    const selectedWeeks = new Set(weeklyProgress.map((item) => item.week_number));
    return allWeeks.filter((week) => !selectedWeeks.has(week)).map((week) => ({ value: week, label: week }));
  }, [weeklyProgress]);

  // Hitung jumlah pekerja & total biaya secara langsung
  const [debouncedWorkers] = useDebounce(workers, 1200);
  const [debouncedMaterials] = useDebounce(materials, 1200);

  const workerCount = useMemo(() => debouncedWorkers.filter((w) => w.worker_name.trim() !== "").length, [debouncedWorkers]);

  const workerCost = useMemo(() => debouncedWorkers.reduce((sum, w) => sum + (w.total_cost || 0), 0), [debouncedWorkers]);

  const materialCost = useMemo(() => debouncedMaterials.reduce((sum, m) => sum + (m.total_cost || 0), 0), [debouncedMaterials]);

  const handleSubmit = useCallback(
    (values: IWeeklyProgressCreate) => {
      const formData = { ...values, project_id: projectId, worker: workers, material: materials };
      postData(formData);
    },
    [workers, materials, projectId, postData]
  );

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
          {({ values, errors, touched, setFieldValue, isSubmitting }) => {
            console.log("valaues", values);

            return (
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
                  <FormAddWorker workers={workers} setWorkers={setWorkers} />

                  <Stack justify="flex-start" align="start">
                    <Text
                      size="md"
                      fw={500}
                      c="blue"
                      ta="center"
                      mt="md"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                      Total Pengeluaran Pekerja{" "}
                      {`Rp. ${workerCost.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Text>
                  </Stack>
                  <Divider />

                  <FormAddMaterial materials={materials} setMaterials={setMaterials} />
                  <Stack justify="flex-start" align="start">
                    <Text
                      size="md"
                      fw={500}
                      c="blue"
                      ta="center"
                      mt="md"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                      Total Pengeluaran Material{" "}
                      {`Rp. ${materialCost.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Text>
                  </Stack>

                  <Divider />
                  <NumberInput
                    w={200}
                    label="Persentase Pengerjaan"
                    placeholder="Persentase"
                    defaultValue={Number(values.percentage) || undefined} // Use defaultValue to prevent constant re-renders
                    onBlur={(e) => setFieldValue("percentage", String(e.target.value))} // Update Formik state on blur
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
                    defaultValue={values.note.toLocaleUpperCase()} // Pastikan values.note sudah terdefinisi dalam Formik state
                    placeholder="Enter additional information"
                    onBlur={(e) => setFieldValue("note", e.target.value.toUpperCase())} // Update saat onBlur
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
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddWeeklyProgressModal;

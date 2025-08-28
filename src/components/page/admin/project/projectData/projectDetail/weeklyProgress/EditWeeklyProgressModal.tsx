import React, { useCallback } from "react";
import { Modal, Button, Group, Select, Textarea, Text, Stack, NumberInput, SimpleGrid, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { useUpdateWeeklyProgressForm } from "@/api/weekly-progress/editDataWeeklyProgress";
import { getInitialValuesUpdateWeeklyProgress } from "@/utils/initialValues/initialValuesWeeklyProgress";
import { IconPencil } from "@tabler/icons-react";
import { allWeeks } from "@/constants/dictionary";
import FormAddMaterial from "./FormAddMaterial";
import FormAddWorker from "./FormAddWorker";
import { validationSchemaWeeklyProgressCreate } from "@/utils/validation/weeeklyProgress-validation";
import BreathingActionIcon from "@/components/common/button/ButtonActionGo";

const EditWeeklyProgressModal = ({
  projectId,
  refetchWeeklyProgressData,
  initialData,
}: {
  projectId: any;
  refetchWeeklyProgressData: () => void;
  initialData?: IWeeklyProgressUpdate;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateData, isPending: isLoadingUpdateWeeklyProgressData } = useUpdateWeeklyProgressForm(
    refetchWeeklyProgressData,
    close
  );

  const handleSubmit = (values: IWeeklyProgressUpdate) => {
    const formData = { ...values, id: initialData?.id };
    updateData(formData);
  };

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2.5rem"
        icon={<IconPencil size="1.5rem" />}
        gradient="linear-gradient(135deg, #60A5FA, #3B82F6)"
      />

      <Modal opened={opened} onClose={close} size="100%" yOffset="180px">
        <Formik
          initialValues={getInitialValuesUpdateWeeklyProgress(initialData)}
          validationSchema={validationSchemaWeeklyProgressCreate}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => {
            // console.log("valaues", values);
            // console.log("errors", errors);

            const handleInputChange = useCallback((setFieldValue: any, field: string, value: any) => {
              setFieldValue(field, value);
            }, []);

            return (
              <Form>
                <SimpleGrid p={40}>
                  <Text fw={900} size="xl">
                    Tambah Progress Mingguan
                  </Text>

                  <Select
                    mt={2}
                    w={200}
                    label="Minggu Ke"
                    placeholder="Pilih Minggu"
                    data={allWeeks}
                    value={values.week_number}
                    onChange={(value) => handleInputChange(setFieldValue, "week_number", value)}
                    error={touched.week_number && errors.week_number ? errors.week_number : undefined}
                  />

                  <Divider />

                  <FormAddWorker
                    workers={values.worker}
                    setWorkers={(val) => setFieldValue("worker", val)}
                    errors={errors.worker}
                    touched={touched.worker}
                  />

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
                      {`Rp. ${values.amount_worker?.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Text>
                  </Stack>
                  <Divider />

                  <FormAddMaterial
                    materials={values.material}
                    setMaterials={(val) => setFieldValue("material", val)}
                    errors={errors.material}
                    touched={touched.material}
                  />
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
                      {`Rp. ${values.amount_material.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Text>
                  </Stack>

                  <Divider />
                  <NumberInput
                    w={200}
                    label="Persentase Pengerjaan"
                    placeholder="Persentase"
                    value={Number(values.percentage) || undefined} // Use defaultValue to prevent constant re-renders
                    onChange={(value) => handleInputChange(setFieldValue, "percentage", value)}
                    error={touched.percentage && errors.percentage ? errors.percentage : undefined}
                    rightSection={
                      <Text size="sm" c="gray">
                        %
                      </Text>
                    }
                  />

                  <Textarea
                    label="Note"
                    value={values.note}
                    placeholder="Enter additional information"
                    onChange={(event) => handleInputChange(setFieldValue, "note", event.currentTarget.value)}
                    mt="md"
                    error={touched.note && errors.note ? errors.note : undefined}
                  />

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default" disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="blue"
                      disabled={isLoadingUpdateWeeklyProgressData}
                      loading={isLoadingUpdateWeeklyProgressData || isSubmitting}
                    >
                      Ubah Progres
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

export default EditWeeklyProgressModal;

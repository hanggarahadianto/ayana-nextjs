import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Text, Stack, InputWrapper, ActionIcon, SimpleGrid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { projectDuration, projectStatusOptions } from "@/constants/dictionary";
import { useSubmitProjectCreate } from "@/api/project/postDataProject";
import { getInitialValuesCreateProject } from "@/utils/initialValues/initialValuesProject";
import { validationSchemaProject } from "@/utils/validation/project-validation";

interface AddProjectModalProps {
  refetchProjectData: () => void;
  companyId: string;
}

const AddProjectModal = ({ refetchProjectData, companyId }: AddProjectModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingCreateProject } = useSubmitProjectCreate({
    onSuccess: refetchProjectData,
    onClose: close,
    companyId,
  });

  const handleSubmit = useCallback(
    (values: IProjectCreate, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const updatedValues: IProjectCreate = {
        ...values,

        company_id: companyId,
      };
      postData(updatedValues);
      setSubmitting(false);
    },
    [companyId, postData]
  );

  const handleChangeProject = (field: keyof IProjectCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  return (
    <>
      <ActionIcon onClick={open} size="3.5rem" radius="xl" variant="gradient" gradient={{ from: "green", to: "lime", deg: 90 }}>
        <IconPlus size="1.5rem" />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        yOffset="180px" // Moves modal down
      >
        <Formik
          initialValues={getInitialValuesCreateProject(companyId)}
          validationSchema={validationSchemaProject}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            // console.log(errors);
            return (
              <>
                <Form>
                  <Text size="lg" fw={800} p={20}>
                    {values.location && values.unit ? `${values.location} - ${values.unit}` : "Tambah Proyek"}
                  </Text>
                  <SimpleGrid p={20}>
                    <Group>
                      <TextInput
                        label="Nama Lokasi"
                        withAsterisk
                        error={touched.location && errors.location ? errors.location : undefined}
                        placeholder="Pilih Lokasi"
                        onChange={(event) => handleChangeProject("location", event.currentTarget.value.toUpperCase(), setFieldValue)}
                      />

                      <TextInput
                        label="Nama Blok"
                        withAsterisk
                        error={touched.unit && errors.unit ? errors.unit : undefined}
                        value={values?.unit.toUpperCase()}
                        placeholder="Masukan Nama Blok"
                        onChange={(event) => handleChangeProject("unit", event.currentTarget.value.toUpperCase(), setFieldValue)}
                      />

                      <TextInput
                        error={touched.type && errors.type ? errors.type : undefined}
                        label="Tipe"
                        placeholder="Contoh: 45 / 72"
                        value={values.type}
                        onChange={(e) => {
                          const inputValue = e.currentTarget.value;
                          handleChangeProject("type", inputValue, setFieldValue);
                        }}
                      />
                    </Group>
                    <Stack gap={20}>
                      <InputWrapper label="Investor" withAsterisk error={touched.investor && errors.investor ? errors.investor : undefined}>
                        <TextInput
                          placeholder="Masukan Investor"
                          value={values.investor?.toUpperCase() || ""}
                          onChange={(event) => handleChangeProject("investor", event.currentTarget.value.toUpperCase(), setFieldValue)}
                        />
                      </InputWrapper>
                      <InputWrapper
                        label="Penanggung Jawab"
                        withAsterisk
                        error={touched.project_leader && errors.project_leader ? errors.project_leader : undefined}
                      >
                        <TextInput
                          placeholder="Masukan Penanggung Jawab"
                          value={values.project_leader?.toUpperCase() || ""}
                          onChange={(event) =>
                            handleChangeProject("project_leader", event.currentTarget.value.toUpperCase(), setFieldValue)
                          }
                        />
                      </InputWrapper>

                      <InputWrapper
                        label="Biaya Proyek"
                        withAsterisk
                        required
                        error={touched.total_cost && errors.total_cost ? errors.total_cost : undefined}
                      >
                        <TextInput
                          placeholder="Masukan Biaya Proyek"
                          value={values.total_cost ? `Rp. ${values.total_cost.toLocaleString("id-ID")}` : ""}
                          onChange={(event) => {
                            const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            const numericValue = Number(rawValue) || 0;
                            handleChangeProject("total_cost", numericValue, setFieldValue); // Store as number
                          }}
                        />
                      </InputWrapper>
                      <InputWrapper required error={touched.project_time && errors.project_time ? errors.project_time : undefined}>
                        <Select
                          label="Durasi Project"
                          placeholder="Pilih Durasi Waktu"
                          onChange={(value: any) => {
                            handleChangeProject("project_time", value, setFieldValue);
                          }}
                          data={projectDuration}
                          required
                        />
                      </InputWrapper>
                      <Group gap={40}>
                        <InputWrapper
                          label="Tanggal Mulai"
                          required
                          error={touched.project_start && errors.project_start ? errors.project_start : undefined}
                        >
                          <DatePickerInput
                            w={200}
                            type="default"
                            firstDayOfWeek={0}
                            placeholder="Tanggal Mulai"
                            clearable
                            locale="id"
                            radius="sm"
                            valueFormat="DD MMMM YYYY"
                            rightSection={<IconCalendar size={18} />}
                            onChange={(value: Date | null) => {
                              if (value) {
                                const formattedDate = value.toISOString(); // Convert to ISO format (e.g., "2025-01-01T00:00:00Z")
                                handleChangeProject("project_start", formattedDate, setFieldValue);
                              }
                            }}
                            onBlur={handleBlur}
                          />
                        </InputWrapper>

                        <InputWrapper
                          label="Tanggal Selesai"
                          required
                          error={touched.project_end && errors.project_end ? errors.project_end : undefined}
                        >
                          <DatePickerInput
                            w={200}
                            type="default"
                            firstDayOfWeek={0}
                            placeholder="Tanggal Selesai"
                            clearable
                            locale="id"
                            radius="sm"
                            valueFormat="DD MMMM YYYY"
                            rightSection={<IconCalendar size={18} />}
                            onChange={(value: Date | null) => {
                              if (value) {
                                const formattedDate = value.toISOString(); // Convert to ISO format (e.g., "2025-06-01T00:00:00Z")
                                handleChangeProject("project_end", formattedDate, setFieldValue);
                              }
                            }}
                            onBlur={handleBlur}
                          />
                        </InputWrapper>
                      </Group>
                      <Textarea
                        error={touched.note && errors.note ? errors.note : undefined}
                        value={values.note.toUpperCase()}
                        label="Keterangan"
                        placeholder="Masukan Keterangan"
                        onChange={(event) => handleChangeProject("note", event.currentTarget.value.toUpperCase(), setFieldValue)}
                        mt="md"
                      />
                      <InputWrapper
                        label="Status Proyek"
                        required
                        error={touched.project_status && errors.project_status ? errors.project_status : undefined}
                      >
                        <Select
                          placeholder="Pilih Status"
                          value={values.project_status}
                          onChange={(value) => handleChangeProject("project_status", value, setFieldValue)}
                          data={projectStatusOptions}
                          required
                        />
                      </InputWrapper>
                    </Stack>

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" loading={isLoadingCreateProject}>
                        Tambah Proyek
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

export default memo(AddProjectModal);

import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Text, Stack, InputWrapper, ActionIcon, SimpleGrid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useSubmitProjectForm } from "@/api/project/postDataProject";
import { locationOptions, projectDuration, typeOptions } from "@/constants/dictionary";
import { initialValueProjectCreate, validationSchemaProject } from "@/utils/initialValues/initialValuesProject";

const AddProjectModal = ({ refetchProjectData }: { refetchProjectData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitProjectForm(refetchProjectData, close);

  const handleSubmit = (values: IProjectCreate, { setSubmitting }: any) => {
    const projectName =
      values.location && values.unit && values.type ? `${values.location} - ${values.unit} - ${values.type}` : "Unnamed Project";

    const updatedValues = {
      ...values,
      project_name: projectName, // Auto-generate project name
    };

    console.log("Form values submitted:", updatedValues);
    postData(updatedValues);
    setSubmitting(false);
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
        yOffset="100px" // Moves modal down
      >
        <Formik
          initialValues={initialValueProjectCreate}
          validationSchema={validationSchemaProject}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            const handleInputChange = useCallback((setFieldValue: any, field: string, value: any) => {
              setFieldValue(field, value);
            }, []);

            return (
              <>
                <Form>
                  <Text size="lg" fw={800} p={20}>
                    {values.location && values.unit ? `${values.location} - ${values.unit}` : "Tambah Proyek"}
                  </Text>
                  <SimpleGrid p={20}>
                    <Group>
                      <Select
                        label="Nama Lokasi"
                        withAsterisk
                        error={touched.location && errors.location ? errors.location : undefined}
                        placeholder="Pilih Lokasi"
                        onChange={(value: any) => setFieldValue("location", value)}
                        data={locationOptions}
                      />

                      <TextInput
                        label="Nama Blok"
                        withAsterisk
                        error={touched.unit && errors.unit ? errors.unit : undefined}
                        value={values?.unit.toUpperCase()}
                        placeholder="Masukan Nama Blok"
                        onChange={(event) => setFieldValue("unit", event.currentTarget.value.toUpperCase())}
                      />

                      <InputWrapper required error={touched.type && errors.type ? errors.type : undefined}>
                        <Select
                          label="Tipe"
                          placeholder="Pilih Tipe"
                          onChange={(value: any) => setFieldValue("type", value)}
                          data={typeOptions}
                          required
                        />
                      </InputWrapper>
                    </Group>
                    <Stack gap={20}>
                      <InputWrapper label="Investor" withAsterisk error={touched.investor && errors.investor ? errors.investor : undefined}>
                        <TextInput
                          placeholder="Masukan Investor"
                          value={values.investor?.toUpperCase() || ""}
                          onChange={(event) => setFieldValue("investor", event.currentTarget.value.toUpperCase())}
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
                          onChange={(event) => setFieldValue("project_leader", event.currentTarget.value.toUpperCase())}
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
                            setFieldValue("total_cost", numericValue); // Store as number
                          }}
                        />
                      </InputWrapper>
                      <InputWrapper required error={touched.project_time && errors.project_time ? errors.project_time : undefined}>
                        <Select
                          label="Durasi Project"
                          placeholder="Pilih Durasi Waktu"
                          onChange={(value: any) => {
                            setFieldValue("project_time", value);
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
                                handleInputChange(setFieldValue, "project_start", formattedDate);
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
                                handleInputChange(setFieldValue, "project_end", formattedDate);
                              }
                            }}
                            onBlur={handleBlur}
                          />
                        </InputWrapper>
                      </Group>
                      <Textarea
                        value={values.note.toUpperCase()}
                        label="Keterangan"
                        placeholder="Masukan Keterangan"
                        onChange={(event) => setFieldValue("note", event.currentTarget.value.toUpperCase())}
                        mt="md"
                      />
                    </Stack>

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Cancel
                      </Button>
                      <Button type="submit" loading={isLoadingSubmitProjectData}>
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

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
  InputWrapper,
  NumberInput,
  ActionIcon,
  SimpleGrid,
  Input,
} from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useSubmitProjectForm } from "@/src/api/project/postDataProject";
import { initialValueProjectCreate, validationSchemaProject } from "./initialValuesProject";

const AddProjectModal = ({ refetchProjectData }: { refetchProjectData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitProjectData } = useSubmitProjectForm(refetchProjectData, close);

  const handleSubmit = (values: IProjectCreate, { setSubmitting }: any) => {
    const projectName = values.location && values.unit ? `${values.location} - ${values.unit}` : "Unnamed Project";

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
            console.log(values);
            // console.log("ERROR", errors);

            const handleInputChange = (setFieldValue: any, field: string, value: any) => {
              setFieldValue(field, value); // Update field value in Formik
            };

            return (
              <>
                <Form>
                  <Text size="lg" fw={800} p={20}>
                    {values.location && values.unit ? `${values.location} - ${values.unit}` : "Tambah Proyek"}
                  </Text>
                  <SimpleGrid p={20}>
                    <Group>
                      <InputWrapper
                        label="Nama Lokasi"
                        withAsterisk
                        error={touched.location && errors.location ? errors.location : undefined}
                      >
                        <Select
                          placeholder="Pilih Lokasi"
                          onChange={(value: any) => setFieldValue("location", value)}
                          data={[
                            { value: "GAW", label: "GAW" },
                            { value: "ABW", label: "ABW" },
                          ]}
                        />
                      </InputWrapper>

                      <InputWrapper label="Nama Blok" withAsterisk error={touched.unit && errors.unit ? errors.unit : undefined}>
                        <TextInput placeholder="Masukan Nama Blok" onChange={(event) => setFieldValue("unit", event.currentTarget.value)} />
                      </InputWrapper>

                      <InputWrapper required error={touched.type && errors.type ? errors.type : undefined}>
                        <Select
                          label="Tipe"
                          placeholder="Pilih Tipe"
                          onChange={(value: any) => setFieldValue("type", value)}
                          data={[
                            { value: "32 / 60", label: "32 / 60" },
                            { value: "36 / 60", label: "36 / 60" },
                          ]}
                          required
                        />
                      </InputWrapper>
                    </Group>
                    <Stack gap={20}>
                      <InputWrapper
                        label="Penanggung Jawab" // Add label here
                        withAsterisk
                        error={touched.project_leader && errors.project_leader ? errors.project_leader : undefined}
                      >
                        <TextInput
                          placeholder="Masukan Penanggung Jawab"
                          onChange={(event) => setFieldValue("project_leader", event.currentTarget.value)}
                        />
                      </InputWrapper>

                      <InputWrapper
                        label="Biaya Proyek"
                        withAsterisk
                        required
                        error={touched.total_cost && errors.total_cost ? errors.total_cost : undefined}
                      >
                        <NumberInput
                          hideControls
                          placeholder="Masukan Biaya Proyek"
                          value={values.total_cost || ""}
                          onChange={(value) => setFieldValue("total_cost", value)}
                        />
                      </InputWrapper>
                      <InputWrapper required error={touched.project_time && errors.project_time ? errors.project_time : undefined}>
                        <Select
                          label="Durasi Project"
                          placeholder="Pilih Durasi Waktu"
                          onChange={(value: any) => {
                            setFieldValue("project_time", value);
                          }}
                          data={[
                            { value: "30", label: "30 Hari" },
                            { value: "40", label: "40 Hari" },
                            { value: "60", label: "60 Hari" },
                            { value: "90", label: "90 Hari" },
                            { value: "120", label: "120 Hari" },
                          ]}
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
                        label="Keterangan"
                        placeholder="Masukan Keterangan"
                        onChange={(event) => setFieldValue("note", event.currentTarget.value)}
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

export default AddProjectModal;

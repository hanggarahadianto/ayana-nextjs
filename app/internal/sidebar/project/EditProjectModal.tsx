import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, InputWrapper, NumberInput, ActionIcon, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar, IconEdit } from "@tabler/icons-react";
import { useUpdateProjectForm } from "@/src/api/project/editDataProject";
import { getInitialValuesUpdateProject } from "./initialValuesProject";
import { FiSettings } from "react-icons/fi";

const EditProjectModal = ({ initialData, refetchProjectData }: { initialData: IProjectUpdate; refetchProjectData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateData, isPending: isLoadingUpdateProjectData } = useUpdateProjectForm(refetchProjectData, close);

  const handleSubmit = (values: IProjectUpdate, { setSubmitting }: any) => {
    console.log("Updating project with values:", values);

    const formData = { ...values, id: initialData?.id };

    updateData(formData);
    setSubmitting(false);
  };

  useEffect(() => {
    if (initialData) {
      //   open();
    }
  }, [initialData]);

  //   console.log("Edit project", initialData);

  return (
    <>
      <ActionIcon onClick={open} size="3rem" radius="lg" variant="white">
        <FiSettings size="1rem" />
      </ActionIcon>
      <Modal opened={opened} onClose={close} size="xl" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdateProject(initialData)}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            console.log(values);
            const handleInputChange = (setFieldValue: any, field: string, value: any) => {
              setFieldValue(field, value); // Update field value in Formik
            };
            return (
              <Form>
                <Stack p={20}>
                  <InputWrapper required error={touched.project_name && errors.project_name ? errors.project_name : undefined}>
                    <TextInput
                      label="Nama Proyek"
                      value={values.project_name}
                      onChange={(event) => setFieldValue("project_name", event.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper required error={touched.project_leader && errors.project_leader ? errors.project_leader : undefined}>
                    <TextInput
                      label="Penanggung Jawab"
                      value={values.project_leader}
                      onChange={(event) => setFieldValue("project_leader", event.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper required error={touched.total_cost && errors.total_cost ? errors.total_cost : undefined}>
                    <NumberInput
                      hideControls
                      label="Biaya Proyek"
                      value={values.total_cost || ""}
                      onChange={(value) => setFieldValue("total_cost", value)}
                    />
                  </InputWrapper>

                  <InputWrapper required error={touched.project_time && errors.project_time ? errors.project_time : undefined}>
                    <Select
                      label="Durasi Project"
                      placeholder="Pilih Durasi Waktu"
                      value={values.project_time}
                      onChange={(value) => setFieldValue("project_time", value)}
                      data={[
                        { value: "30", label: "30 Hari" },
                        { value: "40", label: "40 Hari" },
                        { value: "60", label: "60 Hari" },
                        { value: "90", label: "90 Hari" },
                        { value: "120", label: "120 Hari" },
                      ]}
                    />
                  </InputWrapper>

                  <Group>
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
                        value={values.project_start ? new Date(values.project_start) : null} // ✅ Ensure it's always a Date
                        onChange={(value: Date | null) => {
                          handleInputChange(setFieldValue, "project_start", value ? value.toISOString() : null);
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
                        value={values.project_end ? new Date(values.project_end) : null} // ✅ Ensure it's always a Date
                        onChange={(value: Date | null) => {
                          handleInputChange(setFieldValue, "project_end", value ? value.toISOString() : null);
                        }}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>
                  </Group>

                  <Textarea label="Note" value={values.note} onChange={(event) => setFieldValue("note", event.target.value)} />
                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Cancel
                    </Button>
                    <Button type="submit" loading={isLoadingUpdateProjectData}>
                      Update Proyek
                    </Button>
                  </Group>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default EditProjectModal;

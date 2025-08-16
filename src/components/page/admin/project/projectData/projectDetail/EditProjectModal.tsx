"use client";

import React from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, InputWrapper, NumberInput, ActionIcon, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconCalendar } from "@tabler/icons-react";
import { FiSettings } from "react-icons/fi";
import { useUpdateProjectForm } from "@/api/project/editDataProject";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { getInitialValuesUpdateProject } from "@/utils/initialValues/initialValuesProject";
import { projectStatusOptions } from "@/constants/dictionary";
import { validationSchemaProject } from "@/utils/validation/project-validation";

const EditProjectModal = ({ initialData, refetchProjectData }: { initialData?: IProjectUpdate; refetchProjectData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateData, isPending: isLoadingUpdateProjectData } = useUpdateProjectForm(refetchProjectData, close);

  const handleSubmit = (values: IProjectUpdate, { setSubmitting }: any) => {
    const formData = { ...values, id: initialData?.id };

    updateData(formData);
    setSubmitting(false);
  };

  const handleChangeProject = (field: keyof IProjectUpdate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="3.5rem"
        icon={<FiSettings size="1.6rem" color="#4B5563" />} // Darker icon color for better contrast
        gradient="linear-gradient(135deg, #F3F4F6, #FFFFFF)"
      />

      <Modal opened={opened} onClose={close} size="xl" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdateProject(initialData)}
          validationSchema={validationSchemaProject}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            // console.log("values", values);
            // console.log("erorr", errors);
            return (
              <Form>
                <Stack p={20}>
                  <Group>
                    <TextInput
                      label="Nama Lokasi"
                      value={values?.location.toUpperCase()}
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

                  <InputWrapper required error={touched.project_leader && errors.project_leader ? errors.project_leader : undefined}>
                    <TextInput
                      label="Penanggung Jawab"
                      value={values.project_leader}
                      onChange={(event) => handleChangeProject("project_leader", event.target.value, setFieldValue)}
                    />
                  </InputWrapper>

                  <InputWrapper required error={touched.investor && errors.investor ? errors.investor : undefined}>
                    <TextInput
                      label="Investor"
                      value={values.investor}
                      onChange={(event) => handleChangeProject("investor", event.target.value.toUpperCase(), setFieldValue)}
                    />
                  </InputWrapper>

                  <InputWrapper required error={touched.total_cost && errors.total_cost ? errors.total_cost : undefined}>
                    <TextInput
                      w={240}
                      label="Harga"
                      placeholder="Masukan Harga"
                      value={values.total_cost ? `Rp. ${values.total_cost.toLocaleString("id-ID")}` : ""}
                      onChange={(event) => {
                        const rawValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        const numericValue = Number(rawValue) || 0;
                        handleChangeProject("total_cost", numericValue, setFieldValue); // Store as number
                      }}
                    />
                  </InputWrapper>
                  <Group>
                    <InputWrapper required error={touched.project_time && errors.project_time ? errors.project_time : undefined}>
                      <Select
                        w={140}
                        label="Durasi Project"
                        placeholder="Pilih Durasi Waktu"
                        value={values.project_time}
                        onChange={(value) => handleChangeProject("project_time", value, setFieldValue)}
                        data={[
                          { value: "35", label: "35 Hari" },
                          { value: "45", label: "45 Hari" },
                          { value: "65", label: "65 Hari" },
                          { value: "95", label: "95 Hari" },
                          { value: "125", label: "125 Hari" },
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
                            handleChangeProject("project_start", value ? value.toISOString() : null, setFieldValue);
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
                            handleChangeProject("project_end", value ? value.toISOString() : null, setFieldValue);
                          }}
                          onBlur={handleBlur}
                        />
                      </InputWrapper>
                    </Group>
                  </Group>

                  <Textarea
                    label="Note"
                    value={values.note}
                    error={touched.note && errors.note ? errors.note : undefined}
                    onChange={(event) => handleChangeProject("note", event.target.value.toUpperCase(), setFieldValue)}
                  />
                  <Select
                    error={touched.project_status && errors.project_status ? errors.project_status : undefined}
                    placeholder="Pilih Status"
                    value={values.project_status}
                    onChange={(value) => handleChangeProject("project_status", value, setFieldValue)}
                    data={projectStatusOptions}
                    required
                  />
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

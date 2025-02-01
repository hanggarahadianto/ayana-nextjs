import React, { useEffect, useState } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, InputWrapper, NumberInput, ActionIcon } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { IconEdit } from "@tabler/icons-react";
import { useUpdateProjectForm } from "@/src/api/project/editDataProject";
import { initialValueProjectUpdate } from "./initialValuesProject";
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
          initialValues={initialData}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleBlur }) => {
            console.log("VALUES", values);
            return (
              <Form>
                <TextInput
                  label="Nama Proyek"
                  value={values.project_name}
                  onChange={(event) => setFieldValue("project_name", event.target.value)}
                />
                {/* <Select
                  label="Nama Lokasi"
                  placeholder="Pilih Lokasi"
                  value={values.location}
                  onChange={(value) => setFieldValue("location", value)}
                  data={[
                    { value: "GAW", label: "GAW" },
                    { value: "ABW", label: "ABW" },
                  ]}
                />
                <TextInput label="Nama Blok" value={values.unit} onChange={(event) => setFieldValue("unit", event.target.value)} /> */}
                <TextInput
                  label="Penanggung Jawab"
                  value={values.project_leader}
                  onChange={(event) => setFieldValue("project_leader", event.target.value)}
                />
                <NumberInput
                  label="Biaya Proyek"
                  value={values.total_cost || ""}
                  onChange={(value) => setFieldValue("total_cost", value)}
                />
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
                <InputWrapper label="Tanggal Mulai">
                  <DatePickerInput
                    value={new Date(values?.project_start)}
                    onChange={(value) => setFieldValue("project_start", value ? value.toISOString() : "")}
                    onBlur={handleBlur}
                  />
                </InputWrapper>
                <InputWrapper label="Tanggal Selesai">
                  <DatePickerInput
                    value={new Date(values?.project_end)}
                    onChange={(value) => setFieldValue("project_end", value ? value.toISOString() : "")}
                    onBlur={handleBlur}
                  />
                </InputWrapper>
                <Textarea label="Note" value={values.note} onChange={(event) => setFieldValue("note", event.target.value)} />
                <Group justify="flex-end" mt="md">
                  <Button onClick={close} variant="default">
                    Cancel
                  </Button>
                  <Button type="submit" loading={isLoadingUpdateProjectData}>
                    Update Proyek
                  </Button>
                </Group>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default EditProjectModal;

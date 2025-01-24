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
} from "@mantine/core";

import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import { initialValueProject } from "./initialValuesProject";
import { IconCalendar } from "@tabler/icons-react";
import { useSubmitProjectForm } from "@/src/api/project/postDataProject";

const AddProjectModal = ({
  refetchProjectData,
}: {
  refetchProjectData: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "teal"; // Green
      case "pending":
        return "yellow"; // Yellow
      case "inprogress":
        return "blue"; // Blue
      default:
        return "gray"; // Default color
    }
  };

  const { mutate: postData, isPending: isLoadingSubmitProjectData } =
    useSubmitProjectForm(refetchProjectData, close);

  const handleSubmit = (values: IProjectCreate, { setSubmitting }: any) => {
    console.log("Form values submitted:", values);
    postData(values);
    setSubmitting(false);
  };

  const addProjectField = (setFieldValue: any, tasks: any) => {
    // Add a new task to the task array
    const newWeeklyProgress = { name: "", status: "pending" };
    setFieldValue("weekly_progress", [...tasks, newWeeklyProgress]);
  };

  const formatIDR = (value: any) => {
    if (!value) return "";
    return `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} `;
  };

  const parseIDR = (value: any) => {
    if (!value) return "";
    return value.replace(/[^0-9]/g, "");
  };

  const [formData, setFormData] = useState({
    location: "",
    unit: "",
    projectName: "",
  });

  return (
    <>
      <Button onClick={open}>Tambah Project</Button>

      <Modal opened={opened} onClose={close} size={"xl"}>
        <Formik
          initialValues={initialValueProject}
          validateOnBlur={false}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, handleBlur }) => {
            console.log(values);

            const handleInputChange = (
              setFieldValue: any,
              field: string,
              value: any
            ) => {
              setFieldValue(field, value); // Update field value in Formik
            };

            const handleProjectName = (
              field: "location" | "unit",
              value: string
            ) => {
              const updatedData = { ...formData, [field]: value };
              updatedData.projectName =
                `${updatedData.location} - ${updatedData.unit}`.trim();
              setFormData(updatedData);
              setFieldValue("project_name", updatedData?.projectName);
            };

            return (
              <>
                <Form>
                  <Text size="lg" fw={800} p={20}>
                    {formData.projectName || "Tambah Proyek"}
                  </Text>
                  <Group>
                    <Select
                      label="Nama Lokasi"
                      placeholder="Pilih Lokasi"
                      onChange={(value: any) =>
                        handleProjectName("location", value)
                      }
                      data={[
                        { value: "GAW", label: "GAW" },
                        { value: "ABW", label: "ABW" },
                      ]}
                      required
                    />
                    <TextInput
                      label="Nama Blok"
                      placeholder="Masukan Nama Blok"
                      onChange={(event) =>
                        handleProjectName("unit", event.target.value)
                      }
                    />
                  </Group>

                  <TextInput
                    label="Nama Penanggung Jawab Proyek"
                    placeholder="Masukan Nama Penanggung Jawab Proyek"
                    onChange={(event) =>
                      setFieldValue("project_leader", event.currentTarget.value)
                    }
                    mt="md"
                  />
                  <NumberInput
                    hideControls
                    label="Biaya Proyek"
                    placeholder="Masukan Biaya Proyek"
                    value={values.total_cost || ""}
                    onChange={(value) => setFieldValue("total_cost", value)}
                    mt="md"
                  />

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
                  <Group p={12} gap={40}>
                    <InputWrapper label="Tanggal Mulai">
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
                            handleInputChange(
                              setFieldValue,
                              "project_start",
                              formattedDate
                            );
                          }
                        }}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>

                    <InputWrapper label="Tanggal Selesai">
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
                            handleInputChange(
                              setFieldValue,
                              "project_end",
                              formattedDate
                            );
                          }
                        }}
                        onBlur={handleBlur}
                      />
                    </InputWrapper>
                  </Group>

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
                    <Button type="submit" loading={isLoadingSubmitProjectData}>
                      Tambah Proyek
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

export default AddProjectModal;

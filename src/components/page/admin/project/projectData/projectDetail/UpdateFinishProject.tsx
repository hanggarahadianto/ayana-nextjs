"use client";

import React from "react";
import { Modal, Button, Group, Stack, Text, Card } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import * as Yup from "yup";
import { useFinishDataProject } from "@/api/project/useFinishProject";
import { IconCalendar } from "@tabler/icons-react";
import { FaCheckCircle } from "react-icons/fa";
import { format } from "date-fns";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";

const FinishProjectModal = ({ initialData, refetchProjectData }: { initialData?: IProjectUpdate; refetchProjectData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: finishProject, isPending: isLoadingFinishProject } = useFinishDataProject(refetchProjectData);

  // initialValues pegang Date object
  const initialValues = {
    id: initialData?.id || "",
    project_finished: new Date(),
  };

  const validationSchema = Yup.object().shape({
    project_finished: Yup.date().required("Tanggal selesai wajib diisi"),
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    finishProject({
      ...values,
      project_finished: format(values.project_finished, "yyyy-MM-dd"), // aman karena sudah string
      project_status: "done",
    });

    setSubmitting(false);
    close();
  };

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="3.5rem"
        icon={<FaCheckCircle size="1.6rem" color="#16A34A" />}
        gradient="linear-gradient(135deg, #dcfce7, #ffffff)" // hijau lembut
      />

      <Modal opened={opened} onClose={close} size="lg" yOffset="70px" title="Selesaikan Project" centered>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleSubmit, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Card>
                <Group justify="space-between" gap={"10px"}>
                  <Text fw={500}>Tanggal Mulai</Text>
                  <Text>{initialData?.project_start ? formatDateIndonesia(initialData.project_start) : "-"}</Text>
                </Group>

                <Group justify="space-between" mt={"10px"}>
                  <Text fw={500}>Tanggal Akhir</Text>
                  <Text>{initialData?.project_end ? formatDateIndonesia(initialData.project_end) : "-"}</Text>
                </Group>
              </Card>

              <Stack gap="md" mt={"40px"}>
                <DatePickerInput
                  label="Tanggal Selesai"
                  locale="id"
                  clearable
                  radius="sm"
                  valueFormat="DD MMMM YYYY" // tampilan di input
                  rightSection={<IconCalendar size={18} />}
                  error={touched.project_finished && typeof errors.project_finished === "string" ? errors.project_finished : undefined}
                  value={values.project_finished}
                  onChange={(date) => setFieldValue("project_finished", date)}
                />

                <Group justify="flex-end" mt="md">
                  <Button variant="default" onClick={close}>
                    Batal
                  </Button>
                  <Button type="submit" loading={isLoadingFinishProject} color="green">
                    Tandai Selesai
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default FinishProjectModal;

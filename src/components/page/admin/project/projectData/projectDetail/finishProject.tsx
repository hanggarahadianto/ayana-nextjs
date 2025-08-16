"use client";

import React from "react";
import { Modal, Button, Group, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import * as Yup from "yup";
import { useFinishDataProject } from "@/api/project/useFinishProject";
import { IconCalendar } from "@tabler/icons-react";
import { FaCheckCircle } from "react-icons/fa";

const FinishProjectModal = ({ initialData, refetchProjectData }: { initialData?: IProjectUpdate; refetchProjectData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: finishProject, isPending: isLoadingFinishProject } = useFinishDataProject(refetchProjectData);

  // initialValues langsung di sini
  const initialValues = {
    id: initialData?.id || "",
    project_finished: new Date(),
  };

  const validationSchema = Yup.object().shape({
    project_finished: Yup.date().required("Tanggal selesai wajib diisi"),
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
    finishProject({ ...values, project_status: "done" });
    setSubmitting(false);
    close();
  };

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="3.5rem"
        icon={<FaCheckCircle size="1.6rem" color="#16A34A" />} // hijau untuk selesai
        gradient="linear-gradient(135deg, #dcfce7, #ffffff)" // hijau lembut
      />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px" title="Selesaikan Project">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap="md">
                <DatePickerInput
                  label="Tanggal Selesai"
                  placeholder="Pilih tanggal selesai"
                  value={values.project_finished}
                  onChange={(date) => setFieldValue("project_finished", date)}
                  leftSection={<IconCalendar size="1rem" />}
                  required
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

"use client";

import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Stack, Text, NumberInput, Select, MultiSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { useSubmitPresenceRulesForm } from "@/api/employee/postPresenceRule";
import { initialValuePresenceRuleCreate } from "@/utils/initialValues/initialValuesPresenceRule";
import { validationSchemaPresenceRule } from "@/utils/validation/presenceRule-validation";
import { dayDictionary } from "@/constants/dictionary";

interface CreatePresenceRuleModalProps {
  companyId: string;
}

const CreatePresenceRuleModal = ({ companyId }: CreatePresenceRuleModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postPresenceRule, isPending } = useSubmitPresenceRulesForm();

  const handleSubmit = useCallback(
    async (values: IPresenceRuleCreate, { resetForm }: FormikHelpers<IPresenceRuleCreate>) => {
      try {
        const payload = {
          ...values,
          company_id: companyId,
          arrival_tolerances: values.arrival_tolerances.map(Number),
          departure_tolerances: values.departure_tolerances.map(Number),
        };
        postPresenceRule(payload, {
          onSuccess: () => {
            resetForm();
            close();
          },
        });
      } catch (error) {
        console.error("Submit Error:", error);
      }
    },
    [companyId, postPresenceRule, close]
  );

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size="60%" yOffset="100px">
        <Formik
          initialValues={initialValuePresenceRuleCreate(companyId)}
          validationSchema={validationSchemaPresenceRule}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            return (
              <Form>
                <Stack p="lg" gap="md">
                  <Text fw={700}>Tambah Aturan Presensi</Text>

                  <Select
                    label="Hari"
                    placeholder="Pilih Hari"
                    data={dayDictionary}
                    value={values.day}
                    onChange={(val) => setFieldValue("day", val)}
                    error={touched.day && errors.day ? errors.day : undefined}
                  />

                  <TextInput
                    label="Jam Masuk"
                    placeholder="07:00"
                    value={values.start_time}
                    onChange={(e) => setFieldValue("start_time", e.currentTarget.value)}
                    error={touched.start_time && errors.start_time ? errors.start_time : undefined}
                  />

                  <TextInput
                    label="Jam Pulang"
                    placeholder="16:00"
                    value={values.end_time}
                    onChange={(e) => setFieldValue("end_time", e.currentTarget.value)}
                    error={touched.end_time && errors.end_time ? errors.end_time : undefined}
                  />

                  <NumberInput
                    label="Grace Period (menit)"
                    value={values.grace_period_mins}
                    onChange={(val) => setFieldValue("grace_period_mins", val)}
                    min={0}
                  />

                  <MultiSelect
                    label="Toleransi Datang (menit)"
                    data={["5", "10", "15", "20"]}
                    value={values.arrival_tolerances.map(String)}
                    onChange={(val) => setFieldValue("arrival_tolerances", val)}
                    placeholder="Tambah toleransi datang"
                    clearable
                  />

                  <MultiSelect
                    label="Toleransi Pulang (menit)"
                    data={["5", "10", "15", "20"]}
                    value={values.departure_tolerances.map(String)}
                    onChange={(val) => setFieldValue("departure_tolerances", val)}
                    placeholder="Tambah toleransi pulang"
                    clearable
                  />

                  <Select
                    label="Hari Libur"
                    data={[
                      { value: "false", label: "Tidak Libur" },
                      { value: "true", label: "Libur" },
                    ]}
                    value={String(values.is_holiday)}
                    onChange={(val) => setFieldValue("is_holiday", val === "true")}
                  />

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button type="submit" loading={isPending}>
                      Simpan
                    </Button>
                  </Group>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default CreatePresenceRuleModal;

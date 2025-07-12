"use client";

import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Stack, Text, NumberInput, Select, MultiSelect } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { validationSchemaPresenceRule } from "@/utils/validation/presenceRule-validation";
import { dayDictionary } from "@/constants/dictionary";
import { useUpdatePresenceRulesForm } from "@/api/employee/updatePresenceRule";
import { getInitialValuesPresenceRuleUpdate } from "@/utils/initialValues/initialValuesPresenceRule";
import { useModalStore } from "@/store/modalStore";

const UpdatePresenceRuleModal = () => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();

  const { mutate: updatePresenceRule, isPending } = useUpdatePresenceRulesForm();

  const handleSubmit = useCallback(
    async (values: IPresenceRuleUpdate, { setSubmitting }: FormikHelpers<IPresenceRuleUpdate>) => {
      try {
        const payload = {
          ...values,
          company_id: initialData.company_id,
          arrival_tolerances: values.arrival_tolerances.map(Number),
          departure_tolerances: values.departure_tolerances.map(Number),
        };

        updatePresenceRule(payload, {
          onSuccess: () => {
            closeModal();
          },
        });
      } catch (error) {
        console.error("Update Error:", error);
        setSubmitting(false);
      }
    },
    [initialData, updatePresenceRule, closeModal]
  );

  if (modalName !== "editPresenceRule" || !opened || !initialData) return null;

  return (
    <SimpleGridGlobal cols={1}>
      <Modal opened={opened} onClose={closeModal} size="60%" yOffset="100px">
        <Formik
          initialValues={getInitialValuesPresenceRuleUpdate(initialData.company_id, initialData)}
          validationSchema={validationSchemaPresenceRule}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Stack p="lg" gap="md">
                <Text fw={700}>Ubah Aturan Presensi</Text>

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
                  onChange={(val) => setFieldValue("grace_period_mins", val ?? 0)}
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
                  <Button onClick={closeModal} variant="default">
                    Batal
                  </Button>
                  <Button type="submit" loading={isPending}>
                    Simpan Perubahan
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default UpdatePresenceRuleModal;

"use client";

import React, { useCallback, useRef } from "react";
import { Modal, Button, Group, Stack, Text, NumberInput, Select, MultiSelect, ActionIcon } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { Formik, Form, FormikHelpers } from "formik";
import { validationSchemaPresenceRule } from "@/utils/validation/presenceRule-validation";
import { useUpdatePresenceRulesForm } from "@/api/employee/updatePresenceRule";
import { getInitialValuesPresenceRuleUpdate } from "@/utils/initialValues/initialValuesPresenceRule";
import { useModalStore } from "@/store/modalStore";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { dayDictionary } from "@/constants/dictionary";

const UpdatePresenceRuleModal = () => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();

  const { mutate: updatePresenceRule, isPending } = useUpdatePresenceRulesForm();
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

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

                <Group>
                  <TimeInput
                    w={200}
                    label="Jam Masuk"
                    ref={startTimeRef}
                    value={values.start_time}
                    onChange={(e) => setFieldValue("start_time", e.currentTarget.value)}
                    rightSection={
                      <ActionIcon variant="subtle" color="gray" onClick={() => startTimeRef.current?.showPicker()}>
                        <IconClock size={16} stroke={1.5} />
                      </ActionIcon>
                    }
                    error={touched.start_time && errors.start_time ? errors.start_time : undefined}
                  />
                  <TimeInput
                    w={200}
                    label="Jam Pulang"
                    ref={endTimeRef}
                    value={values.end_time}
                    onChange={(e) => setFieldValue("end_time", e.currentTarget.value)}
                    rightSection={
                      <ActionIcon variant="subtle" color="gray" onClick={() => endTimeRef.current?.showPicker()}>
                        <IconClock size={16} stroke={1.5} />
                      </ActionIcon>
                    }
                    error={touched.end_time && errors.end_time ? errors.end_time : undefined}
                  />
                  <NumberInput
                    w={200}
                    label="Grace Period (menit)"
                    value={values.grace_period_mins}
                    onChange={(val) => setFieldValue("grace_period_mins", val ?? 0)}
                    min={0}
                  />
                </Group>

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
                  w={400}
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

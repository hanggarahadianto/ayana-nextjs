"use client";

import React, { memo, useCallback } from "react";
import { Modal, Button, Group, Stack, Text, Select, MultiSelect } from "@mantine/core";
import { Form, Formik } from "formik";
import { useModalStore } from "@/store/modalStore";
import { useAssignUserToCompany } from "@/api/company/assignCompanyHandleUser";
import { assignUserValidationSchema } from "@/utils/validation/companyAssign-validation";

interface AssignUserHandleCompanyModalProps {
  companies: { value: string; label: string }[];
  users: { value: string; label: string }[];
}

const AssignUserHandleCompanyModal = ({ companies, users }: AssignUserHandleCompanyModalProps) => {
  const { opened, modalName, modalData, closeModal } = useModalStore();

  const { mutate: assignUser, isPending: isLoadingSubmit } = useAssignUserToCompany();

  const handleSubmit = useCallback((values: { company_id: string; user_ids: string[] }, { setSubmitting }: any) => {
    assignUser(values, {
      onSuccess: () => {
        closeModal();
        setSubmitting(false);
      },
      onError: () => {
        setSubmitting(false);
      },
    });
  }, []);

  if (modalName !== "assignUserToCompany" || !opened) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="lg" yOffset="100px">
      <Formik
        initialValues={{
          company_id: modalData?.company_id || "",
          user_ids: modalData?.user_ids || [],
        }}
        validationSchema={assignUserValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <Stack p={20} gap={20}>
              <Text fw={600}>Assign User ke Perusahaan</Text>

              <Select
                label="Pilih Perusahaan"
                placeholder="Pilih perusahaan"
                data={companies}
                value={values.company_id}
                onChange={(val) => setFieldValue("company_id", val)}
                // error={touched.company_id && errors.company_id}
              />

              <MultiSelect
                label="Pilih User"
                placeholder="Pilih user yang akan handle"
                data={users}
                value={values.user_ids}
                onChange={(val) => setFieldValue("user_ids", val)}
                // error={touched.user_ids && errors.user_ids}
              />

              <Group justify="flex-end">
                <Button variant="default" onClick={closeModal} disabled={isLoadingSubmit}>
                  Batal
                </Button>
                <Button type="submit" loading={isSubmitting || isLoadingSubmit}>
                  Simpan
                </Button>
              </Group>
            </Stack>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default memo(AssignUserHandleCompanyModal);

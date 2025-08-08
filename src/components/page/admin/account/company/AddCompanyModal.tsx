"use client";

import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Stack, Switch, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { useSubmitCompany } from "@/api/company/postDataCompany";
import { initialCompanyValues } from "@/utils/initialValues/initialValuesCompany";
import { companyValidationSchema } from "@/utils/validation/company-validation";

interface AddCompanyModalProps {
  companyId: string;
  refetchCompanyData: () => void;
}

const AddCompanyModal = ({ companyId, refetchCompanyData }: AddCompanyModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postCompany, isPending: isLoadingSubmitCompany } = useSubmitCompany(refetchCompanyData, close);

  const handleSubmit = useCallback((values: ICompanyCreate, { setSubmitting }: any) => {
    postCompany(values, {
      onSuccess: () => {
        refetchCompanyData?.();
        close();
        setSubmitting(false);
      },
      onError: () => {
        setSubmitting(false);
      },
    });
  }, []);

  return (
    <>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px">
        <Formik initialValues={initialCompanyValues} validationSchema={companyValidationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting }) => (
            <Form>
              <Stack p={20} gap={20}>
                <Text fw={600}>Tambah Perusahaan</Text>

                <TextInput
                  withAsterisk
                  label="Nama Perusahaan"
                  placeholder="Contoh: Agung Sejahtera"
                  value={values.title}
                  onChange={(e) => setFieldValue("title", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.title && errors.title}
                />

                <TextInput
                  withAsterisk
                  label="Kode Perusahaan"
                  placeholder="Contoh: AGS"
                  value={values.company_code}
                  onChange={(e) => setFieldValue("company_code", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.company_code && errors.company_code}
                />

                <TextInput
                  label="Warna"
                  placeholder="#000000"
                  value={values.color}
                  onChange={(e) => setFieldValue("color", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.color && errors.color}
                />

                <Stack gap="xs">
                  <Switch
                    label="Punya Customer?"
                    checked={values.has_customer}
                    onChange={(event) => setFieldValue("has_customer", event.currentTarget.checked)}
                  />
                  <Switch
                    label="Punya Project?"
                    checked={values.has_project}
                    onChange={(event) => setFieldValue("has_project", event.currentTarget.checked)}
                  />
                  <Switch
                    label="Punya Product?"
                    checked={values.has_product}
                    onChange={(event) => setFieldValue("has_product", event.currentTarget.checked)}
                  />
                  <Switch
                    label="Retail?"
                    checked={values.is_retail}
                    onChange={(event) => setFieldValue("is_retail", event.currentTarget.checked)}
                  />
                </Stack>

                <Group justify="flex-end">
                  <Button variant="default" onClick={close}>
                    Batal
                  </Button>
                  <Button type="submit" loading={isSubmitting || isLoadingSubmitCompany}>
                    Simpan Perusahaan
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

export default memo(AddCompanyModal);

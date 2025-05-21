import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid, NumberInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { validationSchemaAccount } from "@/utils/validation/account-validation";
import { initialAccountValues } from "@/utils/initialValues/initialValuesAccount";
import { useSubmitAccount } from "@/api/account/postDataAccount";
import { accountTypeOptions, ValidCategories } from "@/constants/dictionary";

interface AddAccountModalProps {
  refetchAccountData: () => void;
  companyId?: string;
}

const AddAccountModal = ({ refetchAccountData, companyId }: AddAccountModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postData, isPending: isLoadingSubmitAccountData } = useSubmitAccount(refetchAccountData, close);
  const handleSubmit = useCallback(
    (values: IAccountCreate, { setSubmitting }: any) => {
      const payload = {
        ...values,
        company_id: companyId || "",
      };

      console.log("Submitting account:", payload);

      postData(payload, {
        onSuccess: () => {
          refetchAccountData();
          close();
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      });
    },
    [companyId]
  );

  const getPureType = (label: string | null | undefined) => (label ? label.split(" ")[0] : "");

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px">
        <Formik initialValues={initialAccountValues} validationSchema={validationSchemaAccount} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting }) => {
            // console.log("valus", values);
            // console.log("err", errors);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Text fw={600}>Tambah Akun Keuangan</Text>
                  <Stack gap={20}>
                    <NumberInput
                      hideControls
                      withAsterisk
                      label="Kode Akun"
                      placeholder="Contoh: 101"
                      value={values.code === 0 ? "" : values.code}
                      onChange={(e) => setFieldValue("code", e)}
                      onBlur={handleBlur}
                      error={touched.code && errors.code}
                    />

                    <TextInput
                      withAsterisk
                      label="Nama Akun"
                      placeholder="Contoh: Kas"
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.name && errors.name}
                    />

                    <Select
                      withAsterisk
                      label="Tipe Akun"
                      placeholder="Pilih Tipe Akun"
                      data={accountTypeOptions}
                      value={values.type}
                      onChange={(value) => {
                        setFieldValue("type", value || "");
                        if (value !== values.type) {
                          setFieldValue("category", ""); // hanya reset kalau tipe benar-benar berubah
                        }
                      }}
                      onBlur={handleBlur}
                      error={touched.type && errors.type}
                    />

                    {values.type && (
                      <Select
                        withAsterisk
                        label="Kategori Akun"
                        placeholder="Pilih Kategori Akun"
                        value={values.category}
                        onChange={(value) => setFieldValue("category", value || null)} // set null, jangan ""
                        onBlur={handleBlur}
                        error={touched.category && errors.category}
                        data={
                          Array.isArray(ValidCategories[getPureType(values.type)])
                            ? ValidCategories[getPureType(values.type)].map((item) => ({
                                value: item,
                                label: item,
                              }))
                            : []
                        }
                        key={values.type} // paksa render ulang setiap kali 'type' berubah
                      />
                    )}

                    <Textarea
                      label="Deskripsi"
                      placeholder="Deskripsi Akun (opsional)"
                      value={values.description}
                      onChange={(e) => setFieldValue("description", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.description && errors.description}
                    />
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button type="submit" loading={isSubmitting}>
                      Simpan Akun
                    </Button>
                  </Group>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default memo(AddAccountModal);

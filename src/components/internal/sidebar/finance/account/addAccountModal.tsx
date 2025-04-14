import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import ButtonAdd from "@/lib/button/buttonAdd";
import { validationSchemaAccount } from "@/lib/validation/account-validation";
import { initialAccountValues } from "@/lib/initialValues/initialValuesAccount";

interface AddAccountModalProps {
  refetchAccountData: () => void;
  companyId?: string;
}

interface IAccountCreate {
  code: string;
  name: string;
  type: string;
  category: string;
  description: string;
  company_id: string;
}

// Account type options
const accountTypeOptions = [
  { value: "Asset (Aset)", label: "Asset (Aset)" },
  { value: "Liability (Kewajiban)", label: "Liability (Kewajiban)" },
  { value: "Equity (Ekuitas)", label: "Equity (Ekuitas)" },
  { value: "Revenue (Pendapatan)", label: "Revenue (Pendapatan)" },
  { value: "Expense (Beban)", label: "Expense (Beban)" },
];

// Account category options

// Initial values

const AddAccountModal = ({ refetchAccountData, companyId }: AddAccountModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  // Mock submit function - replace with your actual API call
  const handleSubmit = useCallback(
    (values: IAccountCreate, { setSubmitting }: any) => {
      const payload = {
        ...values,
        company_id: companyId || "",
      };

      console.log("Submitting account:", payload);
      // Here you would call your API submit function
      // submitAccountData(payload, {
      //   onSuccess: () => {
      //     refetchAccountData();
      //     close();
      //     setSubmitting(false);
      //   },
      //   onError: () => {
      //     setSubmitting(false);
      //   }
      // });
    },
    [companyId]
  );

  return (
    <>
      <ButtonAdd onClick={open} size={"3.5rem"} />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px" title="Tambah Akun Baru">
        <Formik initialValues={initialAccountValues} validationSchema={validationSchemaAccount} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting }) => (
            <Form>
              <SimpleGrid p={20}>
                <Stack gap={20}>
                  <TextInput
                    withAsterisk
                    label="Kode Akun"
                    placeholder="Contoh: 101"
                    value={values.code}
                    onChange={(e) => setFieldValue("code", e.currentTarget.value)}
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
                    placeholder="Pilih tipe akun"
                    data={accountTypeOptions}
                    value={values.type}
                    onChange={(value) => setFieldValue("type", value || "")}
                    onBlur={handleBlur}
                    error={touched.type && errors.type}
                  />

                  <TextInput
                    withAsterisk
                    label="Kategori Akun"
                    placeholder="Pilih kategori akun"
                    value={values.category}
                    onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                    onBlur={handleBlur}
                    error={touched.name && errors.name}
                  />

                  <Textarea
                    label="Deskripsi"
                    placeholder="Deskripsi akun (opsional)"
                    value={values.description}
                    onChange={(e) => setFieldValue("description", e.currentTarget.value)}
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
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default memo(AddAccountModal);

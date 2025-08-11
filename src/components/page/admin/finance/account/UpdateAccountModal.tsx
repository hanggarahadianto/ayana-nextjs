import React, { memo, useCallback, useEffect } from "react";
import { Modal, TextInput, Button, Group, Select, Textarea, Stack, SimpleGrid, NumberInput, Text } from "@mantine/core";
import { Form, Formik } from "formik";
import { validationSchemaAccount } from "@/utils/validation/account-validation";
import { getInitialAccountValues, initialAccountValues } from "@/utils/initialValues/initialValuesAccount";
import { accountTypeOptions, ValidCategories } from "@/constants/dictionary";
import { useUpdateAccountForm } from "@/api/account/updateDataAccount";
import { useModalStore } from "@/store/modalStore";

interface UpdateAccountModalProps {
  companyId?: string;
  initialValues?: IAccountUpdate;
}

const UpdateAccountModal = ({ companyId, initialValues }: UpdateAccountModalProps) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();
  const { mutate: editData, isPending } = useUpdateAccountForm();

  const handleSubmit = useCallback(
    (values: IAccountUpdate) => {
      const payload = {
        id: values.id,
        values: values,
      };

      editData(payload, {
        onSuccess: () => {
          closeModal(); // hanya tutup modal kalau berhasil
        },
        onError: () => {},
      });
    },
    [companyId]
  );

  const getPureType = (label: string | null | undefined) => (label ? label.split(" ")[0] : "");

  if (modalName !== "editAccount" || !opened || !initialData) return null;

  return (
    <>
      <Modal opened={opened} onClose={closeModal} size="lg" yOffset="100px">
        <Formik initialValues={getInitialAccountValues(initialValues)} validationSchema={validationSchemaAccount} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            // console.log("valus", values);
            // console.log("err", errors);
            return (
              <Form>
                <SimpleGrid p={20}>
                  <Text fw={600}>Ubah Akun {initialValues?.name}</Text>

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
                      placeholder="Pilih tipe akun"
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
                        placeholder="Pilih kategori akun"
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
                      placeholder="Deskripsi akun (opsional)"
                      value={values.description}
                      onChange={(e) => setFieldValue("description", e.currentTarget.value)}
                      onBlur={handleBlur}
                      error={touched.description && errors.description}
                    />
                  </Stack>

                  <Group justify="flex-end" mt="md">
                    <Button onClick={closeModal} variant="default" disabled={isPending}>
                      Batal
                    </Button>
                    <Button type="submit" loading={isPending} disabled={isPending}>
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

export default memo(UpdateAccountModal);

"use client";
import React, { useCallback, useMemo } from "react";
import { Modal, TextInput, Button, Group, Select, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { useSubmitEmployeerForm } from "@/api/employee/postDataEmployee";
import { getInitialValuesEmployeeCreate } from "@/utils/initialValues/initialValuesEmployee";
import { validationSchemaEmployee } from "@/utils/validation/employee-validation";
import { employeeGenderOptions } from "@/constants/dictionary";

interface AddMarketingModalProps {
  companyId: string;
}

const AddAgentModal = ({ companyId }: AddMarketingModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postDataEmployee, isPending: isLoadingSubmitEmployeeData } = useSubmitEmployeerForm();
  const handleSubmit = useCallback(
    async (values: IEmployeeCreate, { resetForm }: FormikHelpers<IEmployeeCreate>) => {
      try {
        const payload = {
          ...values,
        };

        postDataEmployee(payload, {
          onSuccess: async (res: any) => {
            resetForm();
            close();
          },
          onError: (error: any) => {
            showNotification({
              title: "Gagal menyimpan data",
              message: error.message || "Terjadi kesalahan",
              color: "red",
            });
          },
        });
      } catch (error) {
        console.error("Submit Error:", error);
      }
    },
    [postDataEmployee, close]
  );

  const handleChangeEmployee = (field: keyof IEmployeeCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  const genderOptionsMemo = useMemo(() => employeeGenderOptions, []);

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size={"60%"} yOffset="100px">
        <Formik
          initialValues={getInitialValuesEmployeeCreate(companyId)}
          validationSchema={validationSchemaEmployee}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <SimpleGrid>
                <Form>
                  <SimpleGrid p="40px" spacing="md">
                    <Stack>
                      <Text fw={700} mb={10}>
                        Tambah Agent
                      </Text>
                    </Stack>
                    <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Agent"
                      placeholder="Masukkan Nama Agent"
                      onChange={(e) => handleChangeEmployee("name", e.currentTarget.value, setFieldValue)}
                    />
                    <Group grow>
                      <Select
                        label="Jenis Kelamin"
                        placeholder="Masukkan Jenis Kelamin"
                        data={genderOptionsMemo}
                        value={values.gender}
                        onChange={(value) => setFieldValue("gender", value)}
                        error={touched.gender && errors.gender ? errors.gender : undefined}
                      />
                      <TextInput
                        error={touched.phone && errors.phone ? errors.phone : undefined}
                        label="Nomor Telepon"
                        placeholder="Masukkan Nomor Telepon"
                        value={values.phone}
                        onChange={(e) => {
                          const onlyNumbers = e.currentTarget.value.replace(/\D/g, "");
                          handleChangeEmployee("phone", onlyNumbers, setFieldValue);
                        }}
                      />
                    </Group>
                    <TextInput
                      error={touched.address && errors.address ? errors.address : undefined}
                      label="Alamat Agent"
                      placeholder="Masukkan Alamat Agent"
                      onChange={(e) => handleChangeEmployee("address", e.currentTarget.value, setFieldValue)}
                    />
                    <Divider mt={20} />

                    <Group justify="flex-end" mt="md">
                      <Button onClick={close} variant="default">
                        Batal
                      </Button>
                      <Button type="submit" loading={isLoadingSubmitEmployeeData}>
                        Simpan
                      </Button>
                    </Group>
                  </SimpleGrid>
                </Form>
              </SimpleGrid>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default AddAgentModal;

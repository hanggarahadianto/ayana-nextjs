import React, { useCallback, useMemo } from "react";
import { Modal, TextInput, Button, Group, Select, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { useSubmitEmployeerForm } from "@/api/employee/postDataEmployee";
import { departmentOptions, employeeGenderOptions, employeeStatusOptions } from "@/constants/dictionary";
import { getInitialValueAgentCreate } from "@/utils/initialValues/initialValuesAgent";
import { validationSchemaAgent } from "@/utils/validation/agent-validation";
import ButtonAdd from "@/components/common/button/ButtonActionAdd";

const isoDate = (dateStr: string) => {
  const parsed = new Date(dateStr);
  return parsed.toISOString(); // hasil: "1950-01-01T00:00:00.000Z"
};

interface AddMarketingModalProps {
  companyId: string;
}

const AddAgentModal = ({ companyId }: AddMarketingModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: postDataEmployee, isPending: isLoadingSubmitEmployeeData } = useSubmitEmployeerForm();
  const handleSubmit = useCallback(
    async (values: IEmployeeCreate, { resetForm }: FormikHelpers<IEmployeeCreate>) => {
      const finalDateBirth = values.date_birth?.trim() ? isoDate(values.date_birth) : isoDate("1950-01-01");
      try {
        const payload = {
          ...values,
          date_birth: finalDateBirth,
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
  const statusOptionsMemo = useMemo(() => employeeStatusOptions, []);
  const departmentOptionsMemo = useMemo(() => departmentOptions, []);

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />
      <Modal opened={opened} onClose={close} size={"60%"} yOffset="100px">
        <Formik initialValues={getInitialValueAgentCreate(companyId)} validationSchema={validationSchemaAgent} onSubmit={handleSubmit}>
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
                      <Select
                        label="Jenis Kelamin"
                        placeholder="Masukkan Jenis Kelamin"
                        data={genderOptionsMemo}
                        value={values.gender}
                        onChange={(value) => setFieldValue("gender", value)}
                        error={touched.gender && errors.gender ? errors.gender : undefined}
                      />
                    </Group>

                    <TextInput
                      error={touched.address && errors.address ? errors.address : undefined}
                      label="Alamat Agent"
                      placeholder="Masukkan Alamat Agent"
                      onChange={(e) => handleChangeEmployee("address", e.currentTarget.value, setFieldValue)}
                    />
                    <Select
                      readOnly
                      placeholder="Masukkan Divisi"
                      label="Divisi"
                      data={departmentOptionsMemo}
                      value={values.department || "Marketing"}
                      onChange={(value) => setFieldValue("department", value)}
                      error={touched.department && errors.department ? errors.department : undefined}
                    />
                    <Select
                      label="Status"
                      placeholder="Masukkan Status Pekerja "
                      data={statusOptionsMemo}
                      value={values.employee_status}
                      onChange={(value) => setFieldValue("employee_status", value)}
                      error={touched.employee_status && errors.employee_status ? errors.employee_status : undefined}
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

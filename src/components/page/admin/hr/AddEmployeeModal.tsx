"use client";
import React, { useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, SimpleGrid, Divider, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import { showNotification } from "@mantine/notifications";
import ButtonAdd from "@/components/common/button/buttonAdd";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useSubmitEmployeerForm } from "@/api/employee/postDataEmployee";
import { getInitialValuesEmployeeCreate } from "@/utils/initialValues/initialValuesEmployee";
import { validationSchemaEmployee } from "@/utils/validation/employee-validation";
import {
  departmentOptions,
  employeeContractTypeOptions,
  employeeGenderOptions,
  employeeMaritalStatusOptions,
  employeeReligionOptions,
  employeeStatusOptions,
  jabatanOptions,
} from "@/constants/dictionary";

interface AddMarketingModalProps {
  companyId: string;
}

const AddEmployeeModal = ({ companyId }: AddMarketingModalProps) => {
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
            const productId = res?.id;

            if (!productId) {
              showNotification({
                title: "Gagal",
                message: "Tidak mendapat ID produk",
                color: "red",
              });
              return;
            }
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
                        Tambah Karyawan
                      </Text>
                    </Stack>

                    <Group grow>
                      <TextInput
                        error={touched.name && errors.name ? errors.name : undefined}
                        label="Nama Karyawan"
                        placeholder="Masukkan Nama Karyawan"
                        onChange={(e) => handleChangeEmployee("name", e.currentTarget.value, setFieldValue)}
                      />
                      <DatePickerInput
                        error={touched.date_birth && errors?.date_birth}
                        label="Tanggal Lahir"
                        placeholder="Tanggal Lahir"
                        locale="id"
                        clearable
                        radius="sm"
                        valueFormat="DD MMMM YYYY"
                        rightSection={<IconCalendar size={18} />}
                        value={values.date_birth ? new Date(values.date_birth) : null}
                        onChange={(date) => handleChangeEmployee("date_birth", date ? date.toISOString() : null, setFieldValue)}
                      />
                      <Select
                        label="Jenis Kelamin"
                        placeholder="Masukkan Jenis Kelamin"
                        data={employeeGenderOptions}
                        value={values.department}
                        onChange={(value) => setFieldValue("gender", value)}
                        error={touched.gender && errors.gender ? errors.gender : undefined}
                      />
                      <Select
                        label="Status Pernikahan"
                        placeholder="Masukkan Status Pernikahan"
                        data={employeeMaritalStatusOptions}
                        value={values.marital_status}
                        onChange={(value) => setFieldValue("marital_status", value)}
                        error={touched.marital_status && errors.marital_status ? errors.marital_status : undefined}
                      />
                    </Group>

                    <Group>
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
                        placeholder="Masukkan Agama"
                        label="Agama"
                        data={employeeReligionOptions}
                        value={values.religion}
                        onChange={(value) => setFieldValue("religion", value)}
                        error={touched.religion && errors.religion ? errors.religion : undefined}
                      />
                    </Group>
                    <TextInput
                      error={touched.address && errors.address ? errors.address : undefined}
                      label="Alamat Karyawan"
                      placeholder="Masukkan Alamat"
                      onChange={(e) => handleChangeEmployee("address", e.currentTarget.value, setFieldValue)}
                    />
                    <TextInput
                      error={touched.employee_education && errors.employee_education ? errors.employee_education : undefined}
                      label="Pendidikan Karayawan"
                      placeholder="Masukkan Pendidikan"
                      onChange={(e) => handleChangeEmployee("employee_education", e.currentTarget.value, setFieldValue)}
                    />

                    <Divider mt={20} />
                    <Select
                      placeholder="Masukkan Divisi"
                      label="Divisi"
                      data={departmentOptions}
                      value={values.department}
                      onChange={(value) => setFieldValue("home_id", value)}
                      error={touched.department && errors.department ? errors.department : undefined}
                    />
                    <Select
                      placeholder="Masukkan Jabatan"
                      label="Jabatan"
                      data={jabatanOptions}
                      value={values.position}
                      onChange={(value) => setFieldValue("position", value)}
                      error={touched.position && errors.position ? errors.position : undefined}
                    />
                    <Select
                      label="Status"
                      placeholder="Masukkan Status Pekerja "
                      data={employeeStatusOptions}
                      value={values.employee_status}
                      onChange={(value) => setFieldValue("employee_status", value)}
                      error={touched.employee_status && errors.employee_status ? errors.employee_status : undefined}
                    />
                    <Select
                      label="Status Kontrak Karyawan"
                      placeholder="Masukkan Status Kontrak Karyawan"
                      data={employeeContractTypeOptions}
                      value={values.employee_status}
                      onChange={(value) => setFieldValue("employee_contract_type", value)}
                      error={touched.employee_contract_type && errors.employee_contract_type ? errors.employee_contract_type : undefined}
                    />

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

export default AddEmployeeModal;

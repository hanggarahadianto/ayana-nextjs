"use client";
import React, { useCallback, useMemo } from "react";
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
  employeeGenderOptions,
  employeeMaritalStatusOptions,
  employeeReligionOptions,
  employeeStatusOptions,
  employeeTypeOptions,
  jabatanOptions,
} from "@/constants/dictionary";

interface AddMarketingModalProps {
  companyId: string;
  isAgent: boolean;
}

const AddEmployeeModal = ({ companyId, isAgent }: AddMarketingModalProps) => {
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
  const maritalOptionsMemo = useMemo(() => employeeMaritalStatusOptions, []);
  const religionOptionsMemo = useMemo(() => employeeReligionOptions, []);
  const departmentOptionsMemo = useMemo(() => departmentOptions, []);
  const jabatanOptionsMemo = useMemo(() => jabatanOptions, []);
  const statusOptionsMemo = useMemo(() => employeeStatusOptions, []);
  const contractTypeOptionsMemo = useMemo(() => employeeTypeOptions, []);

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
                    <TextInput
                      error={touched.name && errors.name ? errors.name : undefined}
                      label="Nama Karyawan"
                      placeholder="Masukkan Nama Karyawan"
                      onChange={(e) => handleChangeEmployee("name", e.currentTarget.value, setFieldValue)}
                    />
                    <Group grow>
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
                      label="Alamat Karyawan"
                      placeholder="Masukkan Alamat"
                      onChange={(e) => handleChangeEmployee("address", e.currentTarget.value, setFieldValue)}
                    />
                    <Divider mt={20} />
                    <TextInput
                      error={touched.employee_education && errors.employee_education ? errors.employee_education : undefined}
                      label="Pendidikan Terakhir"
                      placeholder="Masukkan Pendidikan"
                      onChange={(e) => handleChangeEmployee("employee_education", e.currentTarget.value, setFieldValue)}
                    />
                    <Group>
                      <Select
                        label="Status Pernikahan"
                        placeholder="Masukkan Status Pernikahan"
                        data={maritalOptionsMemo}
                        onChange={(value) => setFieldValue("marital_status", value)}
                        error={touched.marital_status && errors.marital_status ? errors.marital_status : undefined}
                      />

                      <Select
                        placeholder="Masukkan Agama"
                        label="Agama"
                        data={religionOptionsMemo}
                        value={values.religion}
                        onChange={(value) => setFieldValue("religion", value)}
                        error={touched.religion && errors.religion ? errors.religion : undefined}
                      />
                    </Group>

                    <Divider mt={20} />
                    <Select
                      placeholder="Masukkan Divisi"
                      label="Divisi"
                      data={departmentOptionsMemo}
                      value={values.department}
                      onChange={(value) => setFieldValue("department", value)}
                      error={touched.department && errors.department ? errors.department : undefined}
                    />
                    <Select
                      placeholder="Masukkan Jabatan"
                      label="Jabatan"
                      data={jabatanOptionsMemo}
                      value={values.position}
                      onChange={(value) => setFieldValue("position", value)}
                      error={touched.position && errors.position ? errors.position : undefined}
                    />
                    <Select
                      label="Status"
                      placeholder="Masukkan Status Pekerja "
                      data={statusOptionsMemo}
                      value={values.employee_status}
                      onChange={(value) => setFieldValue("employee_status", value)}
                      error={touched.employee_status && errors.employee_status ? errors.employee_status : undefined}
                    />
                    <Select
                      error={touched.employee_contract_type && errors.employee_contract_type ? errors.employee_contract_type : undefined}
                      label="Status Kontrak Karyawan"
                      placeholder="Masukkan Status Kontrak Karyawan"
                      data={contractTypeOptionsMemo}
                      onChange={(value) => setFieldValue("employee_contract_type", value)}
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

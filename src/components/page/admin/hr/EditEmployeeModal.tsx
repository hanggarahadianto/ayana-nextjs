import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Select, Stack, SimpleGrid, Divider, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { Formik, Form, FormikHelpers } from "formik";
import { useModalStore } from "@/store/modalStore";
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
import { useUpdateEmployeeForm } from "@/api/employee/updateDataEmployee";
import { getInitialValuesUpdateEmployee } from "@/utils/initialValues/initialValuesEmployee";

interface UpdateEmployeeModalProps {
  companyId: string;
  initialValues: IEmployeeUpdate;
}

const EditEmployeeModal = ({ companyId, initialValues }: UpdateEmployeeModalProps) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();
  const { mutate: updateEmployee, isPending } = useUpdateEmployeeForm(closeModal);

  const handleSubmit = useCallback(
    async (values: IEmployeeUpdate, { resetForm }: FormikHelpers<IEmployeeUpdate>) => {
      try {
        updateEmployee({ ...values, id: initialValues.id });
      } catch (error: any) {
        console.error("Update Error:", error);
      }
    },
    [updateEmployee, closeModal, initialData]
  );

  if (modalName !== "editEmployee" || !opened || !initialData) return null;
  console.log("initialvalues", initialData);
  return (
    <Modal opened={opened} onClose={closeModal} size="60%" yOffset="100px">
      <Formik
        initialValues={getInitialValuesUpdateEmployee(companyId, initialValues)}
        validationSchema={validationSchemaEmployee}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <SimpleGrid p={30} spacing="md">
              <Text fw={700} mb={10}>
                Ubah Karyawan: {initialData.name}
              </Text>

              <TextInput
                label="Nama Karyawan"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                error={touched.name && errors.name}
              />

              <Group grow>
                <DatePickerInput
                  label="Tanggal Lahir"
                  value={values.date_birth ? new Date(values.date_birth) : null}
                  onChange={(date) => setFieldValue("date_birth", date ? date.toISOString() : null)}
                  valueFormat="DD MMMM YYYY"
                  locale="id"
                  clearable
                  radius="sm"
                  rightSection={<IconCalendar size={18} />}
                  error={touched.date_birth && errors.date_birth}
                />

                <Select
                  label="Jenis Kelamin"
                  data={employeeGenderOptions}
                  value={values.gender}
                  onChange={(val) => setFieldValue("gender", val)}
                  error={touched.gender && errors.gender}
                />

                <TextInput
                  label="Nomor Telepon"
                  value={values.phone}
                  onChange={(e) => setFieldValue("phone", e.currentTarget.value.replace(/\D/g, ""))}
                  error={touched.phone && errors.phone}
                />
              </Group>

              <TextInput
                label="Alamat"
                value={values.address}
                onChange={(e) => setFieldValue("address", e.currentTarget.value)}
                error={touched.address && errors.address}
              />

              <Divider />

              <TextInput
                label="Pendidikan Terakhir"
                value={values.employee_education}
                onChange={(e) => setFieldValue("employee_education", e.currentTarget.value)}
                error={touched.employee_education && errors.employee_education}
              />

              <Group>
                <Select
                  label="Status Pernikahan"
                  data={employeeMaritalStatusOptions}
                  value={values.marital_status}
                  onChange={(val) => setFieldValue("marital_status", val)}
                  error={touched.marital_status && errors.marital_status}
                />

                <Select
                  label="Agama"
                  data={employeeReligionOptions}
                  value={values.religion}
                  onChange={(val) => setFieldValue("religion", val)}
                  error={touched.religion && errors.religion}
                />
              </Group>

              <Divider />

              <Select
                label="Divisi"
                data={departmentOptions}
                value={values.department}
                onChange={(val) => setFieldValue("department", val)}
                error={touched.department && errors.department}
              />

              <Select
                label="Jabatan"
                data={jabatanOptions}
                value={values.position}
                onChange={(val) => setFieldValue("position", val)}
                error={touched.position && errors.position}
              />

              <Select
                label="Status Karyawan"
                data={employeeStatusOptions}
                value={values.employee_status}
                onChange={(val) => setFieldValue("employee_status", val)}
                error={touched.employee_status && errors.employee_status}
              />

              <Select
                label="Tipe Kontrak"
                data={employeeTypeOptions}
                value={values.employee_contract_type}
                onChange={(val) => setFieldValue("employee_contract_type", val)}
                error={touched.employee_contract_type && errors.employee_contract_type}
              />

              <Group justify="flex-end" mt="md">
                <Button onClick={closeModal} variant="default" disabled={isPending}>
                  Batal
                </Button>
                <Button type="submit" loading={isPending} disabled={isPending}>
                  Simpan
                </Button>
              </Group>
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default memo(EditEmployeeModal);

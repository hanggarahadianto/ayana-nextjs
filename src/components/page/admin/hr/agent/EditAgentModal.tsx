import React, { memo, useCallback, useMemo } from "react";
import { Modal, TextInput, Button, Group, Select, Stack, SimpleGrid, Divider, Text } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import { useModalStore } from "@/store/modalStore";
import { validationSchemaEmployee } from "@/utils/validation/employee-validation";
import { employeeStatusOptions } from "@/constants/dictionary";
import { useUpdateEmployeeForm } from "@/api/employee/updateDataEmployee";
import { getInitialValuesAgentUpdate } from "@/utils/initialValues/initialValuesAgent";

interface UpdateEmployeeModalProps {
  companyId: string;
  initialValues: IEmployeeUpdate;
}

const EditAgentModal = ({ companyId, initialValues }: UpdateEmployeeModalProps) => {
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

  if (modalName !== "editAgent" || !opened || !initialData) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="60%" yOffset="100px">
      <Formik
        initialValues={getInitialValuesAgentUpdate(companyId, initialValues)}
        validationSchema={validationSchemaEmployee}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <SimpleGrid p={30} spacing="md">
              <Text fw={700} mb={10}>
                Ubah Agent: {initialData.name}
              </Text>

              <TextInput
                label="Nama Karyawan"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                error={touched.name && errors.name}
              />
              <TextInput
                error={touched.phone && errors.phone ? errors.phone : undefined}
                label="Nomor Telepon"
                placeholder="Masukkan Nomor Telepon"
                value={values.phone}
                onChange={(e) => {
                  const onlyNumbers = e.currentTarget.value.replace(/\D/g, "");
                  setFieldValue("phone", onlyNumbers);
                }}
              />

              <TextInput
                label="Alamat"
                value={values.address}
                onChange={(e) => setFieldValue("address", e.currentTarget.value)}
                error={touched.address && errors.address}
              />

              <Divider />
              <Select
                label="Status"
                placeholder="Masukkan Status Agen"
                data={employeeStatusOptions}
                value={values.employee_status}
                onChange={(value) => setFieldValue("employee_status", value)}
                error={touched.employee_status && errors.employee_status ? errors.employee_status : undefined}
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

export default memo(EditAgentModal);

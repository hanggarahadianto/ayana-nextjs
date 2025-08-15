"use client";

import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Stack, PasswordInput, Select, Text } from "@mantine/core";
import { Form, Formik } from "formik";
import { useUpdateUserForm } from "@/api/user/updateUserDataForSuperadmin";
import { getInitialValuesUpdateUser } from "@/utils/initialValues/initialValuesUser";
import { userValidationSchemaUpdate } from "@/utils/validation/user-validation";
import { useModalStore } from "@/store/modalStore";

interface UpdateUserByIdModalProps {
  companyId?: string;
  initialValues: IUserUpdate; // data dari store/modal
}

const UpdateUserByIdModal = ({ initialValues }: UpdateUserByIdModalProps) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();
  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateUserForm();

  const handleSubmit = useCallback(
    (values: IUserUpdate) => {
      const payload: IUserUpdate = {
        id: initialData.id,
        username: values.username,
        role: values.role,
        password: values.password?.trim() || "",
        password_confirm: values.password_confirm?.trim() || "",
      };
      updateUser(payload, {
        onSuccess: closeModal,
      });
    },
    [initialData, updateUser, closeModal]
  );

  if (modalName !== "editUser" || !opened || !initialData) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="lg" yOffset="100px">
      <Formik
        initialValues={getInitialValuesUpdateUser(initialValues)}
        validationSchema={userValidationSchemaUpdate}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, handleBlur }) => {
          // console.log("values", values);
          // console.log("err", errors);

          return (
            <Form>
              <Stack p={20} gap={20}>
                <Text fw={600}>Edit User</Text>

                <TextInput
                  withAsterisk
                  label="Username"
                  value={values.username}
                  onChange={(e) => setFieldValue("username", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.username && errors.username}
                />

                <PasswordInput
                  label="Password (Kosongkan jika tidak diubah)"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />

                <PasswordInput
                  label="Konfirmasi Password"
                  value={values.password_confirm}
                  onChange={(e) => setFieldValue("password_confirm", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.password_confirm && errors.password_confirm}
                />

                <Select
                  withAsterisk
                  label="Role"
                  placeholder="Pilih role"
                  data={[
                    { label: "Superadmin", value: "superadmin" },
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                  ]}
                  value={values.role}
                  onChange={(val) => setFieldValue("role", val)}
                  error={touched.role && errors.role}
                />

                <Group justify="flex-end">
                  <Button variant="default" onClick={closeModal} disabled={isLoadingUpdate}>
                    Batal
                  </Button>
                  <Button type="submit" loading={isLoadingUpdate} disabled={isLoadingUpdate}>
                    Ubah
                  </Button>
                </Group>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default memo(UpdateUserByIdModal);

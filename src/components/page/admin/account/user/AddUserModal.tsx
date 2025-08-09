"use client";

import React, { memo, useCallback } from "react";
import { Modal, TextInput, Button, Group, Stack, PasswordInput, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import ButtonAdd from "@/components/common/button/buttonAdd";
import { useSubmitUserForm } from "@/api/auth/register";
import { userValidationSchema } from "@/utils/validation/user-validation";
import { getInitialValuesCreateUser } from "@/utils/initialValues/initialValuesUser";

interface AddUserModalProps {
  refetchUserData: () => void;
}

const AddUserModal = ({ refetchUserData }: AddUserModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postUser, isPending: isLoadingSubmitUser } = useSubmitUserForm();

  const handleSubmit = useCallback((values: IUserCreate, { setSubmitting }: any) => {
    postUser(values, {
      onSuccess: () => {
        refetchUserData?.();
        close();
        setSubmitting(false);
      },
      onError: () => {
        setSubmitting(false);
      },
    });
  }, []);

  return (
    <>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size="lg" yOffset="100px">
        <Formik initialValues={getInitialValuesCreateUser()} validationSchema={userValidationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, handleBlur, isSubmitting }) => (
            <Form>
              <Stack p={20} gap={20}>
                <Text fw={600}>Tambah User</Text>

                <TextInput
                  withAsterisk
                  label="Username"
                  placeholder="Contoh: johndoe"
                  value={values.username}
                  onChange={(e) => setFieldValue("username", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.username && errors.username}
                />

                <PasswordInput
                  withAsterisk
                  label="Password"
                  placeholder="Masukkan password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.currentTarget.value)}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />

                <PasswordInput
                  withAsterisk
                  label="Konfirmasi Password"
                  placeholder="Masukkan kembali password"
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
                  <Button variant="default" onClick={close}>
                    Batal
                  </Button>
                  <Button type="submit" loading={isSubmitting || isLoadingSubmitUser}>
                    Simpan User
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default memo(AddUserModal);

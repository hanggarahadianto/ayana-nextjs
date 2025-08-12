import React, { memo, useCallback, useState } from "react";
import { Modal, Button, Group, Stack, Text } from "@mantine/core";
import { Form, Formik } from "formik";
import { useModalStore } from "@/store/modalStore";
import { useAssignUserToCompany } from "@/api/company/assignCompanyHandleUser";
import { assignUserValidationSchema } from "@/utils/validation/companyAssign-validation";
import SelectUser from "@/components/common/select/SelectUserForSuperadmin";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

interface AssignUserHandleCompanyModalProps {
  company: { value: string; label: string }[];
}

interface UserOption {
  id: string;
  username: string;
}

const AssignUserHandleCompanyModal = (company: any) => {
  const { user } = useLoggedInUser();

  const { opened, modalName, modalData, closeModal } = useModalStore();

  const userId = user?.id ?? "";

  const { mutate: assignUser, isPending: isLoadingSubmit } = useAssignUserToCompany(userId);

  const handleSubmit = useCallback(
    (values: { company_id: string; user_ids: string[] }, { setSubmitting }: any) => {
      assignUser(values, {
        onSuccess: () => {
          closeModal();
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      });
    },
    [assignUser, closeModal]
  );

  if (modalName !== "assignUser" || !opened) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="40%" yOffset="100px">
      <Formik
        initialValues={{
          company_id: modalData,
          user_ids: modalData?.user_ids || [],
        }}
        validationSchema={assignUserValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          console.log("values", values);
          return (
            <Form>
              <Stack p={20} gap={20}>
                <Text fw={600}>Tugaskan Pengguna Untuk Perusahaan</Text>
                <SelectUser
                  userId={userId ?? ""}
                  value={values.user_ids} // ⬅️ pakai state dari formik
                  isuser={false}
                  onChange={(val) => setFieldValue("user_ids", val)} // ⬅️ langsung update array
                />

                <Group justify="flex-end" mt={"140px"}>
                  <Button variant="default" onClick={closeModal} disabled={isLoadingSubmit}>
                    Batal
                  </Button>
                  <Button type="submit" loading={isSubmitting || isLoadingSubmit}>
                    Simpan
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

export default memo(AssignUserHandleCompanyModal);

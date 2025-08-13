import React, { memo, useCallback, useMemo } from "react";
import { Modal, Button, Group, Stack, Text, Badge, ActionIcon } from "@mantine/core";
import { Form, Formik } from "formik";
import { useModalStore } from "@/store/modalStore";
import { useAssignUserToCompany } from "@/api/company/assignCompanyHandleUser";
import { assignUserValidationSchema } from "@/utils/validation/companyAssign-validation";
import SelectUser from "@/components/common/select/SelectUserForSuperadmin";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { IconX } from "@tabler/icons-react";

const AssignUserHandleCompanyModal = () => {
  const { user } = useLoggedInUser();
  const { opened, modalName, modalData, closeModal } = useModalStore();

  const userId = user?.id ?? "";
  const { mutate: assignUser, isPending: isLoadingSubmit } = useAssignUserToCompany(userId);

  const initialUserIds = useMemo(() => modalData?.users?.map((u: any) => u.user_id) || [], [modalData]);

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

  // hanya render kalau modal benar & dibuka
  if (modalName !== "assignUser" || !opened) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="40%" yOffset="100px" title={`Tugaskan Pengguna ke ${modalData?.title}`}>
      <Formik
        initialValues={{
          company_id: modalData?.id || "",
          user_ids: initialUserIds,
        }}
        validationSchema={assignUserValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => {
          // Fungsi hapus user dari list
          const handleRemoveUser = (id: string) => {
            setFieldValue(
              "user_ids",
              values.user_ids.filter((uid) => uid !== id)
            );
          };

          return (
            <Form>
              <Stack p={20} gap={20}>
                {/* List user yang sudah ada */}
                <Stack gap={8}>
                  <Text fw={600}>Pengguna Saat Ini</Text>
                  <Stack gap={16} mt={"20px"}>
                    {modalData?.users?.length > 0 ? (
                      modalData.users
                        .filter((u: any) => values.user_ids.includes(u.user_id))
                        .map((u: any) => (
                          <Badge
                            key={u.user_id}
                            variant="light"
                            color="blue"
                            size="lg"
                            rightSection={
                              <ActionIcon size="sm" color="red" radius="xl" onClick={() => handleRemoveUser(u.user_id)}>
                                <IconX size={14} />
                              </ActionIcon>
                            }
                          >
                            {u.username} ({u.role})
                          </Badge>
                        ))
                    ) : (
                      <Text size="sm" c="dimmed">
                        Belum ada pengguna
                      </Text>
                    )}
                  </Stack>
                </Stack>

                {/* Pilih user baru */}
                <Stack gap={8}>
                  <Text fw={600} mb={"20px"}>
                    Tambah Pengguna Baru
                  </Text>
                  <SelectUser userId={userId} value={values.user_ids} isuser={false} onChange={(val) => setFieldValue("user_ids", val)} />
                </Stack>

                {/* Tombol aksi */}
                <Group justify="flex-end" mt="xl">
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

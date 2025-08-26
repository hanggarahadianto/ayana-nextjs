import React, { memo, useCallback, useMemo } from "react";
import { Modal, Button, Group, Stack, Text, ActionIcon, Card, Grid, ScrollArea, Divider } from "@mantine/core";
import { Form, Formik } from "formik";
import { useModalStore } from "@/store/modalStore";
import { useAssignUserToCompany } from "@/api/company/assignCompanyHandleUser";
import { assignUserValidationSchema } from "@/utils/validation/companyAssign-validation";
import SelectUser from "@/components/common/select/SelectUserForSuperadmin";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { IconX } from "@tabler/icons-react";

// --- Typing ringan untuk modalData ---
interface ICompanyUser {
  id: string; // id relasi (opsional dipakai)
  user_id: string; // id user asli (ini yang dipakai API)
  username: string;
  role?: string;
}
interface ICompanyModalData {
  id: string;
  title: string;
  users?: ICompanyUser[];
}

const AssignUserHandleCompanyModal = () => {
  const { user } = useLoggedInUser();
  const { opened, modalName, modalData, closeModal } = useModalStore();

  const company = (modalData || {}) as ICompanyModalData;
  const userId = user?.id ?? "";

  const { mutate: assignUser, isPending: isLoadingSubmit } = useAssignUserToCompany(userId);

  // selalu panggil hooks di atas, sebelum early-return
  const initialUserIds = useMemo<string[]>(() => company?.users?.map((u) => u.user_id) || [], [company]);

  const handleSubmit = useCallback(
    (values: { company_id: string; user_ids: string[] }, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
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

  // render hanya saat modal assign terbuka
  const isAssignOpen = opened && modalName === "assignUser";
  if (!isAssignOpen) return null;

  return (
    <Modal opened={opened} onClose={closeModal} size="40%" yOffset="100px" title={`Tugaskan Pengguna • ${company?.title ?? ""}`}>
      <Formik
        initialValues={{
          company_id: company?.id || "",
          user_ids: initialUserIds,
        }}
        validationSchema={assignUserValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, setFieldValue, isSubmitting }) => {
          // console.log(errors, errors);

          const handleRemoveUser = (id: string) => {
            setFieldValue(
              "user_ids",
              values.user_ids.filter((uid) => uid !== id)
            );
          };

          const selectedUsers = useMemo<ICompanyUser[]>(
            () => (company?.users || []).filter((u) => values.user_ids.includes(u.user_id)),
            [company?.users, values.user_ids]
          );

          return (
            <Form>
              <Stack p={20} gap={20}>
                {/* Seksi: Pengguna saat ini */}
                <Stack gap={8}>
                  <Text fw={700} size="sm">
                    Pengguna Saat Ini
                  </Text>

                  <Card withBorder radius="md" padding="md">
                    {selectedUsers.length > 0 ? (
                      <ScrollArea.Autosize mah={220}>
                        <Stack gap={10}>
                          {selectedUsers.map((u) => (
                            <Card key={u.user_id} withBorder radius="sm" padding="xs">
                              <Grid align="center">
                                <Grid.Col span={10}>
                                  <Text size="sm" fw={600} lh={1.2}>
                                    {u.username}
                                  </Text>
                                  <Text size="xs" c="dimmed">
                                    {u.role || "-"}
                                  </Text>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                  <Group justify="flex-end">
                                    <ActionIcon
                                      size="sm"
                                      color="red"
                                      radius="xl"
                                      onClick={() => handleRemoveUser(u.user_id)}
                                      aria-label={`Hapus ${u.username}`}
                                    >
                                      <IconX size={14} />
                                    </ActionIcon>
                                  </Group>
                                </Grid.Col>
                              </Grid>
                            </Card>
                          ))}
                        </Stack>
                      </ScrollArea.Autosize>
                    ) : (
                      <Text size="sm" c="dimmed">
                        Belum ada pengguna
                      </Text>
                    )}
                  </Card>
                </Stack>

                <Divider />

                {/* Seksi: Tambah pengguna baru */}
                <Stack gap={8}>
                  <Text fw={700} size="sm" mb={"12px"}>
                    Tambah Pengguna Baru
                  </Text>
                  <SelectUser
                    userId={userId}
                    value={values.user_ids}
                    isuser={false}
                    onChange={(val) => setFieldValue("user_ids", val)}
                    label="Pilih Pengguna"
                  />
                </Stack>

                {/* Aksi */}
                <Group justify="flex-end" mt="60px">
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

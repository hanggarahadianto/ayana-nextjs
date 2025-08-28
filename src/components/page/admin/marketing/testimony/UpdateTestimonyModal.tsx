"use client";

import React, { useCallback, useState } from "react";
import { Modal, Button, Group, Stack, Text, Rating, Textarea, Box, Divider, Switch } from "@mantine/core";
import { Formik, Form, FormikHelpers } from "formik";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { getInitialValuesUpdateTestimony } from "@/utils/initialValues/initialValuesTestiony";
import { validationSchemaTestimony } from "@/utils/validation/testimony-validation";
import SelectCustomerTestimony from "@/components/common/select/SelectCustomerTestimony";
import { useModalStore } from "@/store/modalStore";
import { IconHome, IconUser } from "@tabler/icons-react";
import { useUpdateCustomerTestimonyData } from "@/api/testimony/updateDataTestimony";

interface AddTestimonyModalProps {
  companyId: string;
  initialData: ITestimonyItem;
}

const UpdateTestimonyModal = ({ companyId }: AddTestimonyModalProps) => {
  const { opened, modalName, modalData: initialData, closeModal } = useModalStore();
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  const { mutate: updateDataTestimony, isPending: isLoadingSubmit } = useUpdateCustomerTestimonyData(closeModal);

  const handleSubmit = useCallback(
    async (values: ITestimonyUpdate, { resetForm }: FormikHelpers<ITestimonyUpdate>) => {
      updateDataTestimony(values, {
        onSuccess: () => {
          resetForm();
          closeModal();
          setIsEditingCustomer(false); // Reset
        },
      });
    },
    [updateDataTestimony, closeModal]
  );

  const handleChange = (field: keyof ITestimonyUpdate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  if (modalName !== "editTestimony" || !opened || !initialData) return null;

  return (
    <SimpleGridGlobal cols={1}>
      <Modal opened={opened} onClose={closeModal} size="55%" yOffset="100px">
        <Formik
          initialValues={getInitialValuesUpdateTestimony(initialData)}
          validationSchema={validationSchemaTestimony}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Stack p="lg" gap="md">
                <Text fw={700}>Ubah Testimoni</Text>
                <Divider mt={"12px"} />

                <Stack gap="xs">
                  <Group justify="space-between" align="center" p={"10px"} mb={"12px"}>
                    <Text size="sm" fw={500}>
                      {isEditingCustomer ? "" : "Pelanggan"}
                    </Text>
                    <Switch
                      size="sm"
                      checked={isEditingCustomer}
                      onChange={(event) => setIsEditingCustomer(event.currentTarget.checked)}
                      label={isEditingCustomer ? "Batalkan" : "Ubah Konsumen"}
                      labelPosition="left"
                    />
                  </Group>

                  {isEditingCustomer ? (
                    <SelectCustomerTestimony
                      companyId={companyId}
                      value={values.customer_id}
                      onChange={(val) => setFieldValue("customer_id", val)}
                      label="Pelanggan"
                      error={touched.customer_id && errors.customer_id ? errors.customer_id : undefined}
                    />
                  ) : (
                    <Group justify="space-between">
                      <Stack>
                        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <IconUser size={16} />
                          <Text fw={300} truncate>
                            {initialData.customer?.name ?? "Customer"}
                          </Text>
                        </Box>
                        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <IconHome size={16} />
                          <Text fw={300} truncate>
                            {initialData.customer?.home.title}
                          </Text>
                        </Box>
                      </Stack>
                    </Group>
                  )}
                </Stack>

                <Divider mt={"12px"} />
                <Stack>
                  <Text fw={500}>Rating</Text>
                  <Rating
                    count={5}
                    value={values.rating}
                    onChange={(val) => handleChange("rating", val, setFieldValue)}
                    color="yellow"
                    size="md"
                  />
                  <Divider mt={"12px"} />

                  {touched.rating && errors.rating && (
                    <Text size="xs" c="red">
                      {errors.rating}
                    </Text>
                  )}
                </Stack>

                <Textarea
                  label="Catatan"
                  placeholder="Masukkan catatan atau testimoni"
                  value={values.note}
                  onChange={(e) => handleChange("note", e.currentTarget.value, setFieldValue)}
                  error={touched.note && errors.note ? errors.note : undefined}
                  autosize
                  minRows={3}
                  maxRows={6}
                />

                <Group justify="flex-end" mt="md">
                  <Button onClick={closeModal} variant="default">
                    Batal
                  </Button>
                  <Button type="submit" loading={isLoadingSubmit}>
                    Simpan
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default UpdateTestimonyModal;

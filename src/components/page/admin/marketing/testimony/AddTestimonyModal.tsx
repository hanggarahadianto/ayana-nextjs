"use client";

import React, { useCallback, useState } from "react";
import { Modal, Button, Group, Stack, Text, Rating, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { useSubmitTestimonyForm } from "@/api/testimony/postDataTestimony";
import { getInitialValuesCreateTestimony } from "@/utils/initialValues/initialValuesTestiony";
import { validationSchemaTestimony } from "@/utils/validation/testimony-validation";
import SelectCustomerTestimony from "@/components/common/select/SelectCustomerTestimony";
import ButtonAdd from "@/components/common/button/ButtonActionAdd";

interface AddTestimonyModalProps {
  companyId: string;
}

const AddTestimonyModal = ({ companyId }: AddTestimonyModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: postDataTestimony, isPending: isLoadingSubmit } = useSubmitTestimonyForm();

  const handleSubmit = useCallback(
    async (values: ITestimonyCreate, { resetForm }: FormikHelpers<ITestimonyCreate>) => {
      postDataTestimony(values, {
        onSuccess: () => {
          resetForm();

          close();
        },
      });
    },
    [companyId, postDataTestimony, close]
  );

  const handleChange = (field: keyof ITestimonyCreate, value: any, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, value);
  };

  return (
    <SimpleGridGlobal cols={1}>
      <ButtonAdd onClick={open} size="3.5rem" />

      <Modal opened={opened} onClose={close} size="55%" yOffset="100px">
        <Formik
          initialValues={getInitialValuesCreateTestimony(companyId)}
          validationSchema={validationSchemaTestimony}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => {
            // console.log("values", values);
            // console.log("error", errors);
            return (
              <Form>
                <Stack p="lg" gap="md">
                  <Text fw={700}>Tambah Testimoni</Text>

                  <SelectCustomerTestimony
                    companyId={companyId}
                    value={values.customer_id}
                    onChange={(val) => setFieldValue("customer_id", val)}
                    label="Pelanggan"
                  />

                  <Stack>
                    <Text fw={500}>Rating</Text>
                    <Rating
                      count={5}
                      value={values.rating}
                      onChange={(val) => handleChange("rating", val, setFieldValue)}
                      color="yellow"
                      size="md"
                    />
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
                    <Button onClick={close} variant="default">
                      Batal
                    </Button>
                    <Button type="submit" loading={isLoadingSubmit}>
                      Simpan
                    </Button>
                  </Group>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </SimpleGridGlobal>
  );
};

export default AddTestimonyModal;

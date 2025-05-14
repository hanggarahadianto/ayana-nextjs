"use client";

import { Button, Card, Container, Text, Group, TextInput, Stack, Title } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import { getInitialValuesReservationForm } from "../../../utils/initialValues/InitialValuesReservationForm";
import { useMediaQuery } from "@mantine/hooks";
import { useSubmitReservationForm } from "@/api/reservation/postDataReservationForm";
import { formatCurrency } from "@/utils/formatCurrency";

interface ReservationFormProps {
  id: string;
  start_price: any;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ id, start_price }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { mutate: postData, isPending: isLoadingSubmitPropertyData } = useSubmitReservationForm();

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    postData({ ...values, home_id: id });
    setSubmitting(false);
  };

  return (
    <Formik enableReinitialize initialValues={getInitialValuesReservationForm()} onSubmit={handleSubmit} validateOnBlur={false}>
      {({ values }) => (
        <Form>
          <Container size="sm" px={isMobile ? "xs" : "md"}>
            <Card shadow="xl" p="xl" radius="lg" withBorder style={{ margin: "auto" }}>
              <Stack align="stretch" gap="md">
                <Title order={2} ta="center">
                  Mulai dari
                </Title>
                <Text fw={700} size="xl" c="green" ta="center">
                  {formatCurrency(start_price)} / bulan
                </Text>
                <Text size="md" c="dimmed" ta="center">
                  Dapatkan Update Promo & Harga Terbaru
                </Text>

                <Field name="name">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      label="Nama"
                      placeholder="Masukkan Nama"
                      size="md"
                      radius="md"
                      withAsterisk
                      styles={{
                        input: { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" },
                      }}
                    />
                  )}
                </Field>

                <Field name="email">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      label="Email"
                      placeholder="Masukkan Email"
                      size="md"
                      radius="md"
                      withAsterisk
                      styles={{
                        input: { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" },
                      }}
                    />
                  )}
                </Field>

                <Field name="phone">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      label="No Whatsapp"
                      placeholder="Masukkan No Whatsapp"
                      size="md"
                      radius="md"
                      withAsterisk
                      styles={{
                        input: { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" },
                      }}
                    />
                  )}
                </Field>

                <Group justify="center" mt="xl">
                  <Button
                    type="submit"
                    loading={isLoadingSubmitPropertyData}
                    variant="gradient"
                    gradient={{ from: "blue", to: "cyan" }}
                    size="md"
                    radius="md"
                    style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
                  >
                    Hubungi Kami
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;

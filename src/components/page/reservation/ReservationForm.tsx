"use client";

import { Button, Container, Text, Group, TextInput, SimpleGrid, Stack, Card, Title } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import { getInitialValuesReservationForm } from "../../../utils/initialValues/InitialValuesReservationForm";
import { useMediaQuery } from "@mantine/hooks";
import { useSubmitReservationForm } from "@/api/reservation/postDataReservationForm";

interface ReservationFormProps {
  id: string;
  start_price: any;
}

// Mock function for handling form submission

const ReservationForm: React.FC<ReservationFormProps> = ({ id, start_price }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { mutate: postData, isPending: isLoadingSubmitPropertyData } = useSubmitReservationForm();

  const handleSubmit = (values: Reservation, { setSubmitting }: any) => {
    console.log("Form values submitted:", values);
    postData({ ...values, home_id: id });
    setSubmitting(false);
  };

  return (
    <Formik enableReinitialize initialValues={getInitialValuesReservationForm()} onSubmit={handleSubmit} validateOnBlur={false}>
      {({ values, setFieldValue, resetForm }) => {
        console.log("values on page", values);

        return (
          <Form>
            <Card
              shadow="xl"
              p="xl"
              radius="lg"
              withBorder
              style={{
                maxWidth: isMobile ? 400 : 600,
                margin: "auto",
              }}
            >
              <Stack align="center" gap="md">
                <Title order={2} ta="center">
                  Mulai dari
                </Title>
                <Text fw={700} size="xl" color="blue" ta="center">
                  {start_price} / bulan
                </Text>
                <Text size="md" c="dimmed" ta="center">
                  Dapatkan Update Promo & Harga Terbaru
                </Text>

                <Field name="name">
                  {({ field }: any) => (
                    <TextInput
                      w={isMobile ? 300 : 400}
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
                      w={isMobile ? 300 : 400}
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
                      w={isMobile ? 300 : 400}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReservationForm;

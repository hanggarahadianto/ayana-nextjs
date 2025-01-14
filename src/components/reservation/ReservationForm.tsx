"use client";
import { useSubmitReservationForm } from "@/src/api/reservation/postDataReservationForm";
import { Button, Container, Text, Group, TextInput } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import { getInitialValuesReservationForm } from "./InitialValuesReservationForm";

interface ReservationFormProps {
  id: string;
  start_price: any;
}

const containerProps = {
  mt: 40,
  p: 40,
  bg: "slate",
  style: {
    borderRadius: "8px", // Adjust the value for desired roundness
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adjust shadow as needed
  },
};

// Mock function for handling form submission

const ReservationForm: React.FC<ReservationFormProps> = ({
  id,
  start_price,
}) => {
  console.log("ID", id);
  const { mutate: postData, isPending: isLoadingSubmitPropertyData } =
    useSubmitReservationForm();

  const handleSubmit = (values: Reservation, { setSubmitting }: any) => {
    console.log("Form values submitted:", values);
    postData({ ...values, home_id: id });
    setSubmitting(false);
  };

  return (
    <Container {...containerProps}>
      <Formik
        enableReinitialize={true}
        initialValues={getInitialValuesReservationForm()}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ values, setFieldValue, resetForm }) => {
          console.log("values on page", values);

          return (
            <Form>
              <Text size="lg" w={900} style={{ fontFamily: "Poppins" }} mt={20}>
                Mulai dari
              </Text>
              <Text fw={600} style={{ fontSize: "2.5rem" }} variant="A1">
                {start_price} / bulan
              </Text>
              <Text size="lg" w={900} style={{ fontFamily: "Poppins" }} mt={20}>
                Dapatkan Update Promo & Harga Terbaru
              </Text>
              <Field name="name">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    label="Name"
                    placeholder="Name"
                    mt="md"
                  />
                )}
              </Field>
              <Field name="email">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    label="Email"
                    placeholder="Email"
                    mt="md"
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    label="No Whatsapp"
                    placeholder="No Whatsapp"
                    mt="md"
                  />
                )}
              </Field>

              <Group justify="center" mt="xl">
                <Button type="submit" loading={isLoadingSubmitPropertyData}>
                  Hubungi Kami
                </Button>
              </Group>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default ReservationForm;

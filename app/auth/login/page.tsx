"use client";

import { useEffect, useState } from "react";
import { TextInput, Button, Card, Container, Title, Group, SimpleGrid, Loader, Center, InputWrapper } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Formik, Field, Form } from "formik";
import { useLoginMutation } from "@/src/api/auth/login";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { initialValuesUser, validationSchemaUser } from "./initialValuesUser";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(true); // Loading state

  const { mutate } = useLoginMutation(); // Mutation for login
  const router = useRouter();

  useEffect(() => {
    // Redirect if token exists (client-side check)
    if (Cookies.get("token")) {
      router.push("/internal/sidebar/product"); // Redirect to the product page
    } else {
      setLoading(false); // Stop loading when token check is done
    }
  }, [router]);

  if (loading) {
    return (
      <Center style={{ height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Loader size="xl" color="white" />
      </Center>
    );
  }

  const handleSubmit = (values: { username: string; password: string }) => {
    const { username, password } = values;
    mutate(
      { username, password },
      {
        onSuccess: (response) => {
          if (response) {
            router.push("/internal/sidebar/product"); // Redirect after login
          }
        },
        onError: (response) => {
          console.log("response error", response);
        },
      }
    );
  };

  return (
    <SimpleGrid
      // bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
      style={{
        height: "100vh", // Ensure the container takes full screen height
        width: "100%", // Ensure the container takes full screen width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Full-screen gradient background
        position: "relative", // Set position relative to ensure content layers are on top
      }}
    >
      <Card
        shadow="xl"
        p="250px"
        radius="md"
        style={{
          width: "100%",
          maxWidth: "800px",
          color: "white",
          background: "rgba(255, 255, 255, 0.1)", // Transparent background for card
          backdropFilter: "blur(10px)", // Blur effect for the card background
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Title order={2} style={{ fontWeight: 700, textAlign: "center" }}>
          Welcome Back
        </Title>

        <Formik initialValues={initialValuesUser} onSubmit={handleSubmit} validationSchema={validationSchemaUser}>
          {({ values, handleChange, errors, touched }) => {
            // console.log("VALUES", errors);
            // console.log("ERROR", errors);
            return (
              <Form>
                <SimpleGrid cols={1} spacing="lg">
                  <InputWrapper
                    required
                    error={touched.username && errors.username ? errors.username : undefined}
                    styles={{
                      error: {
                        fontSize: "14px", // Adjust the font size to make it larger
                        color: "#ff0000", // Set the color to red to make it more noticeable
                        marginTop: "5px", // Add some space above the error message
                      },
                    }}
                  >
                    <Field name="username">
                      {({ field }: any) => (
                        <TextInput
                          label="Username"
                          placeholder="Enter your username"
                          {...field}
                          value={values.username}
                          onChange={handleChange}
                          radius="md"
                          size="md"
                          required
                        />
                      )}
                    </Field>
                  </InputWrapper>

                  <InputWrapper
                    required
                    error={touched.password && errors.password ? errors.password : undefined}
                    styles={{
                      error: {
                        fontSize: "14px", // Adjust the font size to make it larger
                        color: "#ff0000", // Set the color to red to make it more noticeable
                        marginTop: "5px", // Add some space above the error message
                      },
                    }}
                  >
                    <Field name="password">
                      {({ field }: any) => (
                        <TextInput
                          label="Password"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          value={values.password}
                          onChange={handleChange}
                          radius="md"
                          size="md"
                          required
                          rightSection={
                            <div
                              style={{
                                cursor: "pointer",
                                pointerEvents: "all",
                              }}
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                            </div>
                          }
                        />
                      )}
                    </Field>
                  </InputWrapper>

                  <Group justify="center">
                    <Button
                      mt={20}
                      fullWidth
                      size="md"
                      radius="md"
                      // variant="white"
                      // color="dark"
                      style={{
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      }}
                      type="submit"
                      styles={(theme) => ({
                        root: {
                          "&:hover": {
                            backgroundColor: theme.colors.blue[5], // Blue color from theme
                            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.3)",
                          },
                        },
                      })}
                    >
                      Login
                    </Button>
                  </Group>
                </SimpleGrid>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </SimpleGrid>
  );
}

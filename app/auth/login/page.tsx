"use client";

import { useEffect, useState } from "react";
import { TextInput, Button, Card, Container, Title, Group, Loader, Center, Stack, InputWrapper } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { initialValuesUser, validationSchemaUser } from "./initialValuesUser";
import { useLoginMutation } from "@/api/auth/login";
import LoadingGlobal from "@/styles/loading/loading-global";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending: isLoadingLogin } = useLoginMutation();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      console.log("🔁 Redirecting to /admin/sidebar/project...");
      setIsRedirecting(true);

      setTimeout(() => {
        router.replace("/admin/sidebar/project");
      }, 100); // kasih delay agar cookies benar-benar ready
    }
  }, [router]);

  if (isRedirecting) {
    return <LoadingGlobal visible={true} />;
  }

  const handleSubmit = (values: { username: string; password: string }) => {
    mutate(values, {
      onSuccess: (response: any) => {
        if (response?.data?.token) {
          const token = response.data.token;
          Cookies.set("token", token); // simpan token di cookie

          console.log("✅ Login berhasil");
          console.log("🧁 Token disimpan di cookies:", token);
          console.log("📦 Semua cookies:", Cookies.get()); // log semua cookies

          router.push("/admin/sidebar/product");
        }
      },
      onError: (response: any) => {
        console.error("❌ Login gagal", response);
      },
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem",
        marginBottom: "-16px",
      }}
    >
      <Card
        shadow="xl"
        radius="md"
        p="2rem"
        style={{
          width: "90%",
          maxWidth: "450px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <Title order={2} style={{ fontWeight: 700, textAlign: "center" }}>
          Welcome Back
        </Title>
        <LoadingGlobal visible={isLoadingLogin} />

        <Formik initialValues={initialValuesUser} onSubmit={handleSubmit} validationSchema={validationSchemaUser}>
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Stack gap="lg">
                <InputWrapper
                  required
                  error={touched.username && errors.username ? errors.username : undefined}
                  styles={{
                    error: {
                      fontSize: "14px",
                      color: "#ff0000",
                      marginTop: "5px",
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
                      fontSize: "14px",
                      color: "#ff0000",
                      marginTop: "5px",
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
                          <div style={{ cursor: "pointer", pointerEvents: "all" }} onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                          </div>
                        }
                      />
                    )}
                  </Field>
                </InputWrapper>

                <Group justify="center">
                  <Button mt={20} fullWidth size="md" radius="md" style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }} type="submit">
                    Login
                  </Button>
                </Group>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

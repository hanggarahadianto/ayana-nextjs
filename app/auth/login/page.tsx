"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { TextInput, Button, Card, Container, Title, Group, Stack } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log("PAYLOAD", { username, password });

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    console.log("RESULT", result);

    if (result?.error) {
      alert("Login failed!");
    } else {
      window.location.href = "/auth/login";
    }
  };

  return (
    <Container
      size="100vw"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        shadow="xl"
        p="lg"
        radius="md"
        style={{
          width: "400px",
          color: "white",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Title order={2} style={{ fontWeight: 700, textAlign: "center" }}>
          Welcome Back
        </Title>

        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          radius="md"
          size="md"
        />

        <TextInput
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          radius="md"
          size="md"
          rightSection={
            <div style={{ cursor: "pointer", pointerEvents: "all" }} onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </div>
          }
        />

        <Group justify="center">
          <Button
            fullWidth
            size="md"
            radius="md"
            variant="white"
            color="dark"
            onClick={handleLogin}
            style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
          >
            Login
          </Button>
        </Group>
      </Card>
    </Container>
  );
}

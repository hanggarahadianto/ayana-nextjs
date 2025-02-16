"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use next/navigation
import { Button, TextInput } from "@mantine/core";
import { useAuth } from "@/src/utils/authProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter(); // ✅ Router for redirection
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password); // ✅ Perform login
    router.push("/internal/sidebar/product"); // ✅ Redirect after login
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      <TextInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

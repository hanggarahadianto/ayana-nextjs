"use client";

import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    try {
      // Hapus token & user dari cookie (atau localStorage jika dipakai)
      Cookies.remove("token");
      Cookies.remove("user");

      // Redirect ke halaman login
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} leftSection={<IconLogout size={18} />} loading={loading} variant="outline" color="red" radius="md">
      Logout
    </Button>
  );
}

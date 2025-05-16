"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingGlobal from "@/styles/loading/loading-global";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      // ✅ Redirect jika token ada
      router.push("/admin/sidebar/product");
    } else {
      // ❌ Tampilkan halaman login
      setChecking(false);
    }
  }, [router]);

  return (
    <>
      <LoadingGlobal visible={checking} />
      {!checking && children}
    </>
  );
}

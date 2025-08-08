import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export function useLoggedInUser() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const cookie = Cookies.get("user");
    if (!cookie) {
      router.push("/home"); // Redirect kalau gak ada user
      return;
    }

    try {
      const parsedUser: IUser = JSON.parse(cookie);
      setUser(parsedUser);
    } catch (error) {
      console.error("❌ Gagal parse user dari cookie:", error);
      router.push("/home");
    }
  }, [router]);

  // Hindari render saat belum mount (prevent hydration mismatch)
  if (!isMounted) return { user: null };

  return { user };
}

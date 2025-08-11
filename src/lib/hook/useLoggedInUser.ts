import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export function useLoggedInUser(redirectIfLoggedInTo?: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (!userCookie) {
      // Belum login
      if (pathname !== "/auth/login") {
        router.replace("/auth/login");
      }
      setIsLoadingUser(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userCookie);
      setUser(parsedUser);

      // 🚀 Jika user ada dan kita minta redirect
      if (redirectIfLoggedInTo && pathname === "/auth/login") {
        const target = redirectIfLoggedInTo.startsWith("/") ? redirectIfLoggedInTo : `/${redirectIfLoggedInTo}`;
        router.replace(target);
      }
    } catch (err) {
      console.error("❌ Failed to parse user cookie:", err);
      Cookies.remove("user");
      router.replace("/auth/login");
    }

    setIsLoadingUser(false);
  }, [pathname, router, redirectIfLoggedInTo]);

  return { user, isLoadingUser };
}

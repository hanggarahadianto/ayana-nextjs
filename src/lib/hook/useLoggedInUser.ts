import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export function useLoggedInUser(redirectIfLoggedInTo?: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // console.log("useLoggedInUser called, current user:", user);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    // console.log("User cookie:", userCookie);

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

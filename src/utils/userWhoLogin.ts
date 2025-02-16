import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useUserWhoLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUser(parsedUser);
          console.log("Logged-in user:", parsedUser);
          router.replace("/internal/sidebar/product"); // Redirect if valid user data exists
        }
      } catch (error) {
        console.error("Error parsing sessionStorage user:", error);
        sessionStorage.removeItem("user"); // Remove corrupted data
      }
    } else {
      setLoading(false); // Show login form if no user is found
    }
  }, [router]);

  return { loading, user };
};

export default useUserWhoLogin;

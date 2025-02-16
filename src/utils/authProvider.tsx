"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "../api/auth/login";

interface AuthContextType extends IAuth {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Load session data when the component mounts
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { token, user } = await handleLogin(username, password);

      console.log("handleLogin response:", { token, user });
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        sessionStorage.setItem("test", "hello");
        console.log(sessionStorage.getItem("test"));

        setUser(user);
        setToken(token);

        router.replace("/internal/sidebar/product");
      } else {
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

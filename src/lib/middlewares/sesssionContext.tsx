// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { handleLogin } from "@/src/api/auth/login";

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Initialize the session state from sessionStorage (if available)
  React.useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    console.log(username);
    console.log(password);
    // const { token, user } = await handleLogin(username, password);

    // console.log("TOKEN", token);
    // console.log("USER", user);

    // if (token && user) {
    //   setToken(token);
    //   setUser(user);

    //   // Store token and user data in sessionStorage
    //   sessionStorage.setItem("token", token);
    //   sessionStorage.setItem("user", JSON.stringify(user));

    //   // Log user details to the console
    //   console.log("User logged in:", user);

    //   router.push("/internal/sidebar/product"); // Redirect after login
    // }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Clear sessionStorage when logging out
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    router.push("/login"); // Redirect to login after logout
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

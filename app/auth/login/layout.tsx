import { AuthProvider } from "@/src/utils/authProvider";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}

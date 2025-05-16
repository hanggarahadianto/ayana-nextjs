import InternalLayoutClient from "@/components/common/layout/InternalLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InternalLayoutClient>{children}</InternalLayoutClient>;
}

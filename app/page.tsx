// app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/home"); // 308 permanent redirect (SEO-friendly)
}

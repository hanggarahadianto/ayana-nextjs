import { redirect } from "next/navigation";

export default function Page() {
  redirect("/home"); // Server-side redirect 301 (SEO-friendly)
  return null;
}

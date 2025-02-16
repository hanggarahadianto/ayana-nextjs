"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/src/utils/authProvider";
import InternalLayout from "./layout";

const InternalPage = () => {
  const { user } = useAuth(); // Get auth state

  if (!user) {
    redirect("/auth/login"); // Redirect before rendering
  }

  return (
    <InternalLayout>
      <div>Welcome to the Internal Page</div>
    </InternalLayout>
  );
};

export default InternalPage;

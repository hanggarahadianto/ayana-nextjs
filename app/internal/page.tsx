"use client";

import InternalLayout from "./layout";
import { signOut, useSession } from "next-auth/react";

const InternalPage = () => {
  return (
    <InternalLayout>
      <button onClick={() => signOut()}>Logout</button>
    </InternalLayout>
  );
};

export default InternalPage;

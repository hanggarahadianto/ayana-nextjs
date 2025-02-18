"use client";

import InternalLayout from "./layout";
import { signOut, useSession } from "next-auth/react";

const InternalPage = () => {
  // const { data: session } = useSession();

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

  return (
    <InternalLayout>
      {/* <h1>Welcome, {session.user?.username}!</h1> */}
      <button onClick={() => signOut()}>Logout</button>
    </InternalLayout>
  );
};

export default InternalPage;

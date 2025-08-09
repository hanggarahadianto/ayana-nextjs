"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import AccountAdminCard from "./AccountCard";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";

export default function AccountComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <AccountAdminCard />
      <CompanyCard />
      <UserCard />
    </SimpleGridGlobal>
  );
}

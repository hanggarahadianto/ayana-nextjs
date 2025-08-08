"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import AccountAdminCard from "./AccountCard";
import CompanyCard from "./CompanyCard";

export default function AccountComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <AccountAdminCard />
      <CompanyCard />
    </SimpleGridGlobal>
  );
}

"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import AccountAdminCard from "./AccountCard";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";
import { Group } from "@mantine/core";

export default function AccountComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <AccountAdminCard />
      <SimpleGridGlobal cols={1} p={"20px"}>
        <Group>
          <CompanyCard />
          <UserCard />
        </Group>
      </SimpleGridGlobal>
    </SimpleGridGlobal>
  );
}

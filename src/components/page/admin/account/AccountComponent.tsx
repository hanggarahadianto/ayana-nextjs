"use client";

import { Grid } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import AccountAdminCard from "./AccountCard";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";

export default function AccountComponent() {
  return (
    <>
      <AccountAdminCard />
      <SimpleGridGlobal cols={1}>
        <Grid mt={"20px"}>
          <Grid.Col span={7}>
            <CompanyCard />
          </Grid.Col>
          <Grid.Col span={5}>
            <UserCard />
          </Grid.Col>
        </Grid>
      </SimpleGridGlobal>
    </>
  );
}

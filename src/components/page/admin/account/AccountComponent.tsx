import { Grid } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import AccountAdminCard from "./AccountCard";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { CompanyByUserTable } from "./company/GetCompanyByUser";

export default function AccountComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();

  return (
    <>
      {/* <AccountAdminCard /> */}
      <Grid>
        <Grid.Col span={6}>
          {/* <CompanyCard /> */}
          <CompanyByUserTable companyId={activeTab?.id || ""} />
        </Grid.Col>
        <Grid.Col span={4}>{/* <UserCard /> */}</Grid.Col>
      </Grid>
    </>
  );
}

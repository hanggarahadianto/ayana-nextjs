import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Stack, Divider } from "@mantine/core";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { CompanyByUserTable } from "./company/GetCompanyByUser";
import { UserForSuperadminTable } from "./user/GetUserSuperadmin";

export default function UserCard() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();
  const { user } = useLoggedInUser();

  if (!user) return null;

  return (
    <>
      <LoadingGlobal visible={isLoadingCompanies} />
      <UserForSuperadminTable companyId={activeTab?.id || ""} />
    </>
  );
}

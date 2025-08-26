import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Stack, Divider } from "@mantine/core";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { CompanyByUserTable } from "./company/GetCompanyByUser";
import { UserForSuperadminTable } from "./user/GetUserSuperadmin";

export default function UserCard() {
  const { companies, isLoadingCompanies, setActiveTab, activeTab } = UseCompanyTabs(); // Use the custom hook

  const { user } = useLoggedInUser();

  return (
    <>
      <LoadingGlobal visible={isLoadingCompanies} />
      <UserForSuperadminTable companyId={activeTab?.id || ""} />
    </>
  );
}

"use client";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { CompanyByUserTable } from "./company/GetCompanyByUser";

export default function CompanyCard() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();
  const { user } = useLoggedInUser();

  if (!user) return null;

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <CompanyByUserTable companyId={activeTab?.id || ""} />
    </SimpleGridGlobal>
  );
}

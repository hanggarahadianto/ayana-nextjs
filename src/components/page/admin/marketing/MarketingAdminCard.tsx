"use client";

import { Group } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { CustomerTable } from "./customer/GetCustomerData";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";

const MarketingAdminCard = () => {
  const { filteredCompanies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs({ has_customer: true });

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={filteredCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
        <LoadingGlobal visible={isLoadingCompanies} />

        <CustomerTable companyId={activeTab?.id || ""} />
      </SimpleGridGlobal>
    </>
  );
};

export default MarketingAdminCard;

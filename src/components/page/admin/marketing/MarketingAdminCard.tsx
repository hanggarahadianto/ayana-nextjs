"use client";

import { Group, Text, Stack } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { CustomerTable } from "./GetMarketingData";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";

const MarketingAdminCard = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();
  const customerCompanies = companies?.filter((company: ICompany) => company.has_customer === true) || [];
  // console.log("active tab", activeTab?.id);

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={customerCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
        <LoadingGlobal visible={isLoadingCompanies} />
        <Group justify="space-between" mb={20}></Group>
        <CustomerTable companyId={activeTab?.id || ""} />
      </SimpleGridGlobal>
    </>
  );
};

export default MarketingAdminCard;

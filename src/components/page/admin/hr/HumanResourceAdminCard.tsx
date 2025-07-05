"use client";

import { Group } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import { HumanResourceTable } from "./employee/GetHumanResourceData";

const HumanResourceAdminCard = () => {
  const { filteredCompanies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs({ has_customer: true });

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={filteredCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
        <LoadingGlobal visible={isLoadingCompanies} />
        <Group justify="space-between" mb={20}></Group>
        <HumanResourceTable companyId={activeTab?.id || ""} companyName={activeTab?.title} isAgent={false} />
        <HumanResourceTable companyId={activeTab?.id || ""} companyName={activeTab?.title} isAgent={true} />
      </SimpleGridGlobal>
    </>
  );
};

export default HumanResourceAdminCard;

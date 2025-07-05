"use client";

import { Group } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import { EmployeeTable } from "./employee/GetEmployeeData";
import { AgentTable } from "./agent/GetAgentData";

const HumanResourceAdminCard = () => {
  const { filteredCompanies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs({ has_customer: true });

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={filteredCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
        <LoadingGlobal visible={isLoadingCompanies} />
        <Group justify="space-between" mb={20}></Group>

        <EmployeeTable companyId={activeTab?.id || ""} companyName={activeTab?.title} />
        <AgentTable companyId={activeTab?.id || ""} companyName={activeTab?.title} />
      </SimpleGridGlobal>
    </>
  );
};

export default HumanResourceAdminCard;

"use client";

import { Group, Text, Stack } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GetProjectAdminData from "./GetProjectData";

const ProjectAdminComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();
  const customerCompanies = companies?.filter((company: ICompany) => company.has_project === true) || [];
  console.log("active tab", activeTab?.id);

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={customerCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
        <LoadingGlobal visible={isLoadingCompanies} />
        <GetProjectAdminData companyId={activeTab?.id || ""} />
      </SimpleGridGlobal>
    </>
  );
};

export default ProjectAdminComponent;

"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GetProjectAdminData from "./projectData/GetProjectDataList";

const ProjectAdminComponent = () => {
  const { companies, isLoadingCompanies, setActiveTab, activeTab } = UseCompanyTabs();
  const customerCompanies = companies?.filter((company: ICompanyItem) => company.has_project === true) || [];

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={customerCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={setActiveTab} />
        <LoadingGlobal visible={isLoadingCompanies} />
        <GetProjectAdminData companyId={activeTab?.id || ""} companyName={activeTab?.title || ""} />
      </SimpleGridGlobal>
    </>
  );
};

export default ProjectAdminComponent;

"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { CustomerTable } from "./customer/GetCustomerData";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GetSalesData from "./sales/GetSalesData";
import { TestimonyTable } from "./testimony/GetTestiomonyData";

const MarketingAdminCard = () => {
  const { filteredCompanies, isLoadingCompanies, setActiveTab, activeTab } = UseCompanyTabs({ has_customer: true });

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={filteredCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={setActiveTab} />
        <LoadingGlobal visible={isLoadingCompanies} />
        <GetSalesData companyId={activeTab?.id || ""} />
        <TestimonyTable companyId={activeTab?.id || ""} />
        <CustomerTable companyId={activeTab?.id || ""} />
      </SimpleGridGlobal>
    </>
  );
};

export default MarketingAdminCard;

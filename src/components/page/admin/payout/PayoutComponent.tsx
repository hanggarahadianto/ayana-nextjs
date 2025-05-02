"use client";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { GetExpenseSummaryData } from "../finance/expense/GetExpenseSummayData";
import { GetOutstandingDebtData } from "../finance/outstandingDebt/GetOutstandingDebtData";

export default function PayoutComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <SimpleGridGlobal cols={1}>
        <GetExpenseSummaryData companyId={activeTab?.id} companyName={activeTab?.title} />
        {/* <GetOutstandingDebtData companyId={activeTab?.id} companyName={activeTab?.title} status="going" />
        <GetOutstandingDebtData companyId={activeTab?.id} companyName={activeTab?.title} status="done" /> */}

        <GetOutstandingDebtData companyId={activeTab?.id} companyName={activeTab?.title} title="Hutang Berjalan" status="going" />
        <GetOutstandingDebtData companyId={activeTab?.id} companyName={activeTab?.title} title="Hutang Lunas" status="done" />
      </SimpleGridGlobal>
    </SimpleGridGlobal>
  );
}

"use client";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { GetOutstandingDebtData } from "../finance/outstandingDebt/GetOutstandingDebtData";
import { GetCashOutData } from "../finance/asset/cashout/GetCashOutData";
import { GetExpenseSummaryData } from "../finance/expense/GetExpenseSummaryData";

export default function PayoutComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook
  const transactionType = "payout";

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <SimpleGridGlobal cols={1} gap="20px">
        <GetCashOutData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          assetType="cashout"
          transactionType={transactionType}
          title="Uang Keluar"
        />

        <GetExpenseSummaryData companyId={activeTab?.id || ""} companyName={activeTab?.title} title="Pengeluaran" />

        <GetOutstandingDebtData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          title="Hutang Berjalan"
          status="going"
          transactionType={transactionType}
        />
        <GetOutstandingDebtData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          title="Hutang Lunas"
          status="done"
          transactionType={transactionType}
        />
      </SimpleGridGlobal>
    </SimpleGridGlobal>
  );
}

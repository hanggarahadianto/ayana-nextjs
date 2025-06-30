"use client";

import { TransactionCategoryCard } from "@/components/page/admin/finance/transactionCategory/GetTransactionCategoryData";
import { AccountCard } from "@/components/page/admin/finance/account/GetAccountData";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { SimpleGrid } from "@mantine/core";
import HumanResourceAdminCard from "./HumanResourceAdminCard";

export default function HumanResourceComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <HumanResourceAdminCard />

      {/* <SimpleGrid cols={1}>
        <GetRevenueSummaryData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          revenueType="realized"
          title={"Terealisasi"}
        />
      </SimpleGrid>
      <SimpleGrid cols={2} spacing="20px">
        <GetEquitySummaryData companyId={activeTab?.id || ""} companyName={activeTab?.title} equityType="setor" title="Di Setor" />
        <GetEquitySummaryData companyId={activeTab?.id || ""} companyName={activeTab?.title} equityType="tarik" title="Di Tarik" />
      </SimpleGrid>

      <SimpleGridGlobal cols={1} gap="20px">
        <TransactionCategoryCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
        <AccountCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
      </SimpleGridGlobal> */}
    </SimpleGridGlobal>
  );
}

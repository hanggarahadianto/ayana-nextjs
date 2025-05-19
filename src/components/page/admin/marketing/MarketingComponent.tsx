"use client";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import AddMarketingModal from "./AddMarketingModal";
import { Stack } from "@mantine/core";
import MarketingAdminCard from "./MarketingAdminCard";

export default function MarketingComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook
  const transactionType = "payin";

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <MarketingAdminCard />
    </SimpleGridGlobal>
  );
}

"use client";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { GetCashinData } from "../finance/asset/cashIn/GetCashinData";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { GetFixedAssetData } from "../finance/asset/fixedAsset/GetFixedAssetData";
import { GetReceivableAssetData } from "../finance/asset/receivable/GetReceivableData";

export default function PayinComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook
  const transactionType = "payin";

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <SimpleGridGlobal cols={1}>
        <GetCashinData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          assetType="cashin"
          transactionType={transactionType}
        />

        <GetFixedAssetData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          assetType="fixed_asset"
          transactionType={transactionType}
        />
        <GetReceivableAssetData
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          assetType="receivable"
          transactionType={transactionType}
        />
      </SimpleGridGlobal>
    </SimpleGridGlobal>
  );
}

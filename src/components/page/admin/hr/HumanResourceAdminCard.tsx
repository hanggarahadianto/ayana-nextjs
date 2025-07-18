"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import GlobalTab from "@/components/common/tab/TabGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import { EmployeeTable } from "./employee/GetEmployeeData";
import { AgentTable } from "./agent/GetAgentData";
import { useCookies } from "@/utils/hook/useCookies";
import { dayDictionary } from "@/constants/dictionary";
import { getDataPresenceRule } from "@/api/employee/getPresenceRule";
import { useQuery } from "@tanstack/react-query";
import { PresenceTable } from "./presence/GetPresenceData";
import { PresenceRuleTable } from "./presenceRule/GetPresenceRuleData";

const HumanResourceAdminCard = () => {
  const { getToken } = useCookies();

  const { filteredCompanies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs({ has_customer: true });
  const companyId = activeTab?.id;
  const token = getToken();

  const queryEnabled = !!token && !!companyId;
  const {
    data: presenceRuleData,
    refetch: isRefetchPresenceRuleData,
    isLoading: isLoadingPresenceRuleData,
  } = useQuery({
    queryKey: ["getPresenceRuleData", companyId],
    queryFn: () =>
      getDataPresenceRule({
        companyId: companyId!,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const presenceRuleListRaw = presenceRuleData?.presenceRules ?? [];
  const dayOrder = dayDictionary.map((d) => d.value.toLowerCase());
  const presenceRuleList = [...presenceRuleListRaw].sort((a, b) => {
    const dayA = a.day.toLowerCase();
    const dayB = b.day.toLowerCase();
    return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
  });

  // console.log("presence rule list", presenceRuleList);

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <GlobalTab data={filteredCompanies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
        <LoadingGlobal visible={isLoadingCompanies || isLoadingPresenceRuleData} />
        <PresenceTable companyId={activeTab?.id || ""} companyName={activeTab?.title} presenceRuleList={presenceRuleList} />
        <PresenceRuleTable
          companyId={activeTab?.id || ""}
          companyName={activeTab?.title}
          presenceRuleList={presenceRuleList}
          refetchPresenceRule={isRefetchPresenceRuleData}
        />
        <EmployeeTable companyId={activeTab?.id || ""} companyName={activeTab?.title} />
        <AgentTable companyId={activeTab?.id || ""} companyName={activeTab?.title} />
      </SimpleGridGlobal>
    </>
  );
};

export default HumanResourceAdminCard;

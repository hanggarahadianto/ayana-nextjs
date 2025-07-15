"use client";

import { Title, Stack } from "@mantine/core";
import { useCookies } from "@/utils/hook/useCookies";
import { useQuery } from "@tanstack/react-query";
import { getSalesData } from "@/api/marketing/getSalesData";
import { useState } from "react";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import EmployeePerformSales from "./EmployeePerfomanceSales";
import AgentPerformSales from "./AgentPerfomanceSales";

interface SalesDashboardParentProps {
  companyId: string;
  companyName?: string;
}

const SalesDashboardParent = ({ companyId, companyName }: SalesDashboardParentProps) => {
  const { getToken } = useCookies();
  const token = getToken();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const queryEnabled = !!token && !!companyId;

  const {
    data: internalData,
    isLoading: loadingInternal,
    refetch: refetchInternal,
    isFetching: fetchingInternal,
  } = useQuery({
    queryKey: ["getSalesData", companyId, false, formattedStartDate, formattedEndDate],
    queryFn: () =>
      getSalesData({
        companyId,
        isAgent: false,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: queryEnabled,
  });

  const {
    data: agentData,
    isLoading: loadingAgent,
    refetch: refetchAgent,
    isFetching: fetchingAgent,
  } = useQuery({
    queryKey: ["getSalesData", companyId, true, formattedStartDate, formattedEndDate],
    queryFn: () =>
      getSalesData({
        companyId,
        isAgent: true,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: queryEnabled,
  });

  return (
    <Stack>
      <Title order={3}>Internal Marketing</Title>
      <EmployeePerformSales
        data={internalData?.data}
        isLoading={loadingInternal}
        isFetching={fetchingInternal}
        onRefresh={refetchInternal}
        companyId={companyId}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <Title order={3} mt="xl">
        Agent Marketing
      </Title>
      <AgentPerformSales
        data={agentData?.data}
        isLoading={loadingAgent}
        isFetching={fetchingAgent}
        onRefresh={refetchAgent}
        companyId={companyId}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </Stack>
  );
};

export default SalesDashboardParent;

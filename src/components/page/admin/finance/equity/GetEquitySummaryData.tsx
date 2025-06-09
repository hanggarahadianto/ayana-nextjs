import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatCurrency } from "@/helper/formatCurrency";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { getEquitySummary } from "@/api/finance/getEquitySummary";
import { columnsBaseEquity } from "./EquityColumn";

interface GetEquityDataProps {
  companyId: string;
  companyName?: string;
  equityType?: string;
}
export const GetEquitySummaryData = ({ companyId, companyName, equityType }: GetEquityDataProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: equityData,
    isLoading: isLoadingEquity,
    refetch: refetchRquityData,
  } = useQuery({
    queryKey: [
      "getEquitySummaryData",
      companyId,
      page,
      limit,
      equityType,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      companyId
        ? getEquitySummary({
            companyId,
            page,
            limit,
            equityType: equityType ?? "",
            search: debouncedSearch,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          })
        : null,
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  //   console.log("equityData", equityData);

  const equityList = equityData?.data.equityList ?? [];

  //   console.log("equityList", equityList);
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, equityData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteEquity } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal(idToDelete);
  };

  const openEditModal = (equityData: IEquitySummaryItem) => {
    useModalStore.getState().openModal("editEquityData", equityData);
  };

  const columns = columnsBaseEquity(openEditModal, handleDeleteDataJournal);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingEquity || isLoadingDeleteEquity} />
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Modal {companyName}
            </Text>
          </Stack>
          <Text size="xl" fw={800} c={"teal"} mt={20}>
            {formatCurrency(equityData?.data.total_equity ?? 0)}
          </Text>
        </Group>
        <SearchTable
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly
        />

        <Box style={{ flex: 1 }}>
          <TableComponent
            startIndex={startIndex}
            data={equityList}
            totalAmount={equityData?.data?.total_equity ?? 0}
            height={"580"}
            columns={columns}
          />
        </Box>

        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

        <PaginationWithLimit
          total={equityData?.data.total ?? 0}
          page={page}
          limit={limit}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </Card>
    </SimpleGridGlobal>
  );
};

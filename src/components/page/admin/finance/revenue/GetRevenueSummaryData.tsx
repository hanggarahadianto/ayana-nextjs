import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group, Skeleton } from "@mantine/core";
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
import { getRevenueSummary } from "@/api/finance/getRevenueSummary";
import { columnsBaseRevenue } from "./RevenueColumn";

interface GetRevenueDataProps {
  companyId: string;
  companyName?: string;
  revenueType?: string;
  title: string;
}
export const GetRevenueSummaryData = ({ companyId, companyName, revenueType, title }: GetRevenueDataProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: revenueData,
    isLoading: isLoadingRevenue,
    refetch: refetchRquityData,
  } = useQuery({
    queryKey: [
      "getRevenueSummaryData",
      companyId,
      selectedCategory,
      page,
      limit,
      revenueType,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      companyId
        ? getRevenueSummary({
            companyId,
            selectedCategory: selectedCategory ?? undefined,
            page,
            limit,
            revenueType: revenueType ?? "",
            search: debouncedSearch,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          })
        : null,
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const RevenueList = revenueData?.data.revenueList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, revenueData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteRevenue } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal([idToDelete]); // <-- bungkus dalam array
  };

  const openEditModal = (RevenueData: IRevenueSummaryItem) => {
    useModalStore.getState().openModal("editRevenueData", RevenueData);
  };

  const columns = columnsBaseRevenue(openEditModal, handleDeleteDataJournal);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Pendapatan {title} {""}
              {companyName}
            </Text>
          </Stack>
          <Text size="xl" fw={800} c={"teal"} mt={20}>
            {formatCurrency(revenueData?.data.total_revenue ?? 0)}
          </Text>
        </Group>
        <SearchTable
          label={"Cari Data Transaksi"}
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly={false}
          transactionType={null}
          debitAccountType={null}
          creditAccountType={"Revenue"}
          useCategory={true}
        />

        <Box style={{ position: "relative" }}>
          {isLoadingRevenue ? (
            <Skeleton height={limit * 60} />
          ) : (
            <Box style={{ flex: 1 }}>
              <TableComponent
                startIndex={startIndex}
                data={RevenueList}
                totalAmount={revenueData?.data?.total_revenue ?? 0}
                height={"580"}
                columns={columns}
              />
            </Box>
          )}

          <LoadingGlobal visible={isLoadingRevenue || isLoadingDeleteRevenue} />
        </Box>

        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

        {!isLoadingRevenue && (
          <PaginationWithLimit
            total={revenueData?.data.total ?? 0}
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
        )}
      </Card>
    </SimpleGridGlobal>
  );
};

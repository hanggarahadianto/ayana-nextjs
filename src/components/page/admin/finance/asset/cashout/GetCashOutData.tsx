import { Card, Text, Group, Box, Pagination, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import SelectCategoryFilter from "@/components/common/select/SelectCategoryFilter";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
}

export const GetCashOutData = ({ companyId, companyName, assetType, transactionType }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: cashOutSummaryData, isPending: isLoadingcashOutData } = useQuery({
    queryKey: ["getCashOutData", companyId, page, assetType, selectedCategory],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        category: selectedCategory ?? "",
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const cashOutList = cashOutSummaryData?.data.assetList ?? [];

  const totalPages = Math.ceil((cashOutSummaryData?.data?.total ?? 0) / limit);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashOutSummaryData?.data.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingcashOutData} />

      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Uang Keluar {companyName}
          </Text>

          <SelectCategoryFilter
            companyId={companyId}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
            }}
          />
        </Stack>
        <Stack align="flex-end" mb={16}>
          <CreateJournalEntryModal companyId={companyId} transactionType={"payout"} />
        </Stack>
      </Group>
      <Box style={{ flex: 1 }}>
        <TableComponent
          startIndex={startIndex}
          data={cashOutList}
          totalAmount={cashOutSummaryData?.data.total_asset}
          transactionType={transactionType}
          height={"580"}
          columns={[
            { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
            { key: "invoice", title: "Invoice", width: 80, minWidth: 80 },
            { key: "partner", title: "Partner", width: 80, minWidth: 80 },
            {
              key: "amount",
              title: "Nominal",
              width: 120,
              minWidth: 120,
              render: (item) => formatCurrency(item.amount),
            },
            {
              key: "date_inputed",
              title: "Tanggal Transaksi",
              width: 120,
              minWidth: 120,
              render: (item) => formatDateIndonesia(item.date_inputed),
            },
            { key: "description", title: "Deskripsi", width: 220, minWidth: 220 },
          ]}
        />
      </Box>

      {totalPages > 0 && (
        <Stack gap="xs" mt={"md"} style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {cashOutSummaryData?.data.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

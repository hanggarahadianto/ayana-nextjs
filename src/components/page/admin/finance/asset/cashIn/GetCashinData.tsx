import { Card, Text, Group, Stack, Pagination, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
}

export const GetCashinData = ({ companyId, companyName, assetType, transactionType }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: cashinSummaryData, isPending: isLoadingCashinData } = useQuery({
    queryKey: ["getCashinData", companyId, page, assetType],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const cashInList = cashinSummaryData?.data.assetList ?? [];

  const totalPages = Math.ceil((cashinSummaryData?.data?.total ?? 0) / limit);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashinSummaryData?.data.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingCashinData} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Uang Masuk {companyName}
          </Text>
          <Select
            label="Filter "
            placeholder="Pilih Type"
            // data={accountTypeOptions}
            value={selectedType}
            onChange={(value) => {
              setSelectedType(value);
            }}
            clearable
            style={{ width: 250 }}
          />
        </Stack>
        <Stack align="flex-end" mb={16}>
          <CreateJournalEntryModal companyId={companyId} transactionType={"payin"} />
        </Stack>
      </Group>

      <TableComponent
        startIndex={startIndex}
        data={cashInList}
        totalAmount={cashinSummaryData?.data.total_asset}
        transactionType={transactionType}
        height={"580"}
        columns={[
          { key: "invoice", title: "Invoice", width: 80, minWidth: 80 },
          { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
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

      {totalPages > 0 && (
        <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {cashinSummaryData?.data.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

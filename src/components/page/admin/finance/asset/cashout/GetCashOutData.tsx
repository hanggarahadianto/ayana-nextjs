import { Card, Text, Group, Stack, Loader, Box, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
}

export const GetCashOutData = ({ companyId, companyName, assetType }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: cashOutSummaryData, isPending: isLoadingcashOutData } = useQuery({
    queryKey: ["getCashOutData", companyId, page, assetType],
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
  const cashOutList = cashOutSummaryData?.data.assetList;

  const totalPages = Math.ceil((cashOutSummaryData?.data?.total ?? 0) / limit);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashOutSummaryData?.data.total || 0);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingcashOutData} />

        <Stack gap="md">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Uang Keluar {companyName}
            </Text>
            <Stack justify="flex-end" align="flex-end" p={40}>
              {companyId && <CreateJournalEntryModal companyId={companyId} transactionType="payout" />}
            </Stack>
          </Group>

          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "50vh", // Pastikan container mengisi tinggi layar
              justifyContent: "space-between", // Paginasi akan tetap di bawah
            }}
          >
            <Group justify="space-between" p={20}>
              <Text fw={600} mb="xs" mt={20}>
                Cash Out
              </Text>
              <Text fw={800} size="xl" c="red">
                {formatCurrency(cashOutSummaryData?.data?.total_asset ?? 0)}
              </Text>
            </Group>
            <Box style={{ flex: 1 }}>
              <TableComponent
                data={cashOutList || []}
                columns={[
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
                startIndex={startIndex}
              />
            </Box>
            <Group gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={page} onChange={setPage} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {cashOutSummaryData?.data.total} data
              </Text>
            </Group>
          </Box>
        </Stack>
      </Card>
    </SimpleGridGlobal>
  );
};

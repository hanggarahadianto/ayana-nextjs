import { Card, Text, Group, Stack, Box, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import SelectCategoryFilter from "@/components/common/select/SelectCategoryFilter";

interface AssetSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
}

export const GetReceivableAssetData = ({ companyId, companyName, assetType, transactionType }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: receivableAssetSummaryData, isPending } = useQuery({
    queryKey: ["getReceivableAssetData", companyId, page, assetType, selectedCategory],
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

  const assetList = receivableAssetSummaryData?.data?.assetList ?? [];

  const totalPages = useMemo(() => {
    return receivableAssetSummaryData?.data?.total ? Math.ceil(receivableAssetSummaryData.data.total / limit) : 1;
  }, [receivableAssetSummaryData]);

  const totalAssetIn = receivableAssetSummaryData?.data?.total_asset ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalAssetIn);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isPending} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Piutang Usaha {companyName}
          </Text>

          <SelectCategoryFilter
            companyId={companyId}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
            }}
          />
        </Stack>
      </Group>

      <Box style={{ flex: 1 }}>
        <TableComponent
          startIndex={startIndex}
          data={assetList}
          totalAmount={totalAssetIn}
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
            Menampilkan {startIndex} sampai {endIndex} dari {receivableAssetSummaryData?.data.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

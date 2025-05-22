import { Card, Text, Group, Stack, Box, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

export const GetFixedAssetData = ({ companyId, companyName, assetType, transactionType }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: fixAssetSummaryData, isPending } = useQuery({
    queryKey: ["getFixedAssetData", companyId, page, assetType, selectedCategory],
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

  const assetList = fixAssetSummaryData?.data?.assetList ?? [];
  const totalData = fixAssetSummaryData?.data?.total ?? 0;
  const totalPages = Math.ceil(totalData / limit);
  const totalAssetIn = fixAssetSummaryData?.data?.total_asset ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalData);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isPending} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Aset Tetap {companyName}
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
      <TableComponent
        startIndex={startIndex}
        data={assetList}
        totalAmount={totalAssetIn}
        transactionType={transactionType}
        height={"580"}
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
      />

      {totalPages > 0 && (
        <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {fixAssetSummaryData?.data.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

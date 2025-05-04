import { Card, Text, Group, Stack, Box, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";

interface AssetSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
}

export const GetFixedAssetData = ({ companyId, companyName, assetType }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: assetSummaryData, isPending } = useQuery({
    queryKey: ["getFixedAssetData", companyId, page, assetType],
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

  const assetList = assetSummaryData?.data?.assetList ?? [];
  const totalData = assetSummaryData?.data?.total ?? 0;
  const totalPages = Math.ceil(totalData / limit);
  const totalAssetIn = assetSummaryData?.data?.total_asset ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalData);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isPending} />

        <Stack gap="md">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Asset {companyName}
            </Text>
          </Group>

          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "50vh",
              justifyContent: "space-between",
            }}
          >
            <Group justify="space-between" p={20}>
              <Text fw={600} mb="xs" mt={20}>
                Fixed Asset
              </Text>
              <Text fw={800} size="xl" c="green">
                {formatCurrency(totalAssetIn)}
              </Text>
            </Group>

            <Box style={{ flex: 1 }}>
              <TableComponent
                data={assetList || []}
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
                Menampilkan {startIndex} sampai {endIndex} dari {totalData} data
              </Text>
            </Group>
          </Box>
        </Stack>
      </Card>
    </SimpleGridGlobal>
  );
};

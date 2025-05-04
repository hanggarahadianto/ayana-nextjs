import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination, Select, Box, Badge } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { IoIosSend } from "react-icons/io";
import TableComponent from "@/components/common/table/TableComponent";
import { calculateDaysLeft, formatDaysToMonths, getStatusColor } from "@/utils/debtStatus";

interface IDebtSummaryItem {
  id: string;
  invoice: string;
  partner: string;
  amount: number;
  date_inputed: string;
  description: string;
  due_date: string;
  status: string;
}

interface GetOutStandingDebtDataProps {
  companyId?: string;
  companyName?: string;
  title: string;
  status: string;
}

export const GetOutstandingDebtData = ({ companyId, companyName, title, status }: GetOutStandingDebtDataProps) => {
  const limit = 10;
  const [pageOutstandingDebt, setPageOutstandingDebt] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDebt, setSelectedDebt] = useState<IDebtSummaryItem | null>(null);

  const {
    data: outstandingDebtData,
    isLoading: isLoadingOutstandingDebt,
    refetch: refetchOutstandingDebtData,
  } = useQuery({
    queryKey: ["getOutstandingDebtByCompanyId", companyId, pageOutstandingDebt, limit, status],
    queryFn: async () => {
      if (!companyId) return null;

      return await getOutstandingDebt({
        companyId,
        page: pageOutstandingDebt,
        status,
        limit,
      });
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const debtList = outstandingDebtData?.data.debtList ?? [];

  const totalPages = useMemo(() => {
    return outstandingDebtData?.data?.total ? Math.ceil(outstandingDebtData.data.total / limit) : 1;
  }, [outstandingDebtData]);

  const startIndex = (pageOutstandingDebt - 1) * limit + 1;
  const endIndex = Math.min(pageOutstandingDebt * limit, outstandingDebtData?.data.total || 0);

  const handleSendClick = (debt: IDebtSummaryItem) => {
    setSelectedDebt(debt);
    // open(); // Uncomment if using modal
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingOutstandingDebt} />

      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Text size="lg" fw={600}>
              {title} {companyName}
            </Text>
            <Select
              label="Filter berdasarkan Type"
              placeholder="Pilih Type"
              value={selectedType}
              onChange={setSelectedType}
              clearable
              style={{ width: 250 }}
            />
          </Stack>
          <Group justify="space-between" p={20}>
            <Text fw={800} size="xl" c={"red"}>
              {formatCurrency(outstandingDebtData?.data?.total_debt ?? 0)}
            </Text>
          </Group>
        </Group>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh",
            justifyContent: "space-between",
          }}
        >
          <Box style={{ flex: 1 }}>
            <TableComponent
              data={debtList}
              columns={[
                { key: "invoice", title: "Invoice", width: 80, minWidth: 80 },
                { key: "partner", title: "Partner", width: 120, minWidth: 120 },
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
                  width: 180,
                  minWidth: 180,
                  render: (item) => formatDateIndonesia(item.date_inputed),
                },
                {
                  key: "due_date",
                  title: "Tanggal Jatuh Tempo",
                  width: 180,
                  minWidth: 180,
                  render: (item) => formatDateIndonesia(item.date_inputed),
                },
                {
                  key: "status",
                  title: "Status",
                  width: 120,
                  minWidth: 120,
                  render: (item) => {
                    const daysLeft = calculateDaysLeft(item.due_date);
                    return item.status === "done" ? (
                      <Badge color="green" p={8}>
                        <Text fw={700} size="xs">
                          Sudah Lunas
                        </Text>
                      </Badge>
                    ) : (
                      <Badge color={getStatusColor(daysLeft)} variant="light">
                        {formatDaysToMonths(daysLeft)}
                      </Badge>
                    );
                  },
                },
                {
                  key: "action",
                  title: "Aksi",
                  width: 80,
                  minWidth: 80,
                  render: (item) =>
                    item.status !== "done" && (
                      <IoIosSend
                        color="green"
                        size="22px"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendClick(item);
                        }}
                      />
                    ),
                },
                { key: "description", title: "Deskripsi", width: 400, minWidth: 400 },
              ]}
            />
          </Box>

          {totalPages > 0 && (
            <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={pageOutstandingDebt} onChange={setPageOutstandingDebt} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {outstandingDebtData?.data.total} data
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

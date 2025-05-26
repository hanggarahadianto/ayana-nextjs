import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Badge, Group, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { IoIosSend } from "react-icons/io";
import TableComponent from "@/components/common/table/TableComponent";
import { calculateDaysLeft, formatDaysToMonths, getStatusColor } from "@/utils/debtStatus";
import ReversedJournalEntryModal from "../journalEntry/ReversedJournalEntryModal";
import SelectCategoryFilter from "@/components/common/select/SelectCategoryFilter";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import ButtonReversedJournal from "@/components/common/button/buttonReversedJournal";

interface GetOutStandingDebtDataProps {
  companyId: string;
  companyName?: string;
  title: string;
  status: string;
  transactionType: string;
}

export const GetOutstandingDebtData = ({ companyId, companyName, title, status, transactionType }: GetOutStandingDebtDataProps) => {
  const limit = 10;
  const [pageOutstandingDebt, setPageOutstandingDebt] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedDebt, setSelectedDebt] = useState<IDebtSummaryItem | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const debtList = outstandingDebtData?.data.debtList ?? [];

  const totalPages = useMemo(() => {
    return outstandingDebtData?.data?.total ? Math.ceil(outstandingDebtData.data.total / limit) : 1;
  }, [outstandingDebtData]);

  const startIndex = (pageOutstandingDebt - 1) * limit + 1;
  const endIndex = Math.min(pageOutstandingDebt * limit, outstandingDebtData?.data.total || 0);

  const handleSendClick = (debt: IDebtSummaryItem) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteDebt } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingOutstandingDebt || isLoadingDeleteDebt} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>

          <SelectCategoryFilter
            companyId={companyId}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
            }}
          />
        </Stack>
        <Text size="xl" fw={800} c={"red"} mt={20}>
          -{formatCurrency(outstandingDebtData?.data.total_debt ?? 0)}
        </Text>
      </Group>
      <TableComponent
        startIndex={startIndex}
        data={debtList}
        totalAmount={outstandingDebtData?.data.total_debt}
        transactionType={transactionType}
        height={"580"}
        columns={[
          { key: "transaction_id", title: "Transaction ID", width: 140, minWidth: 140 },
          { key: "invoice", title: "Invoice", width: 160, minWidth: 160 },
          { key: "partner", title: "Partner", width: 160, minWidth: 160 },
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
            render: (item) => formatDateIndonesia(item.due_date),
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

          { key: "description", title: "Deskripsi", width: 400, minWidth: 400 },
          {
            key: "aksi",
            title: "Aksi",
            width: 10,
            minWidth: 10,
            render: (row: IDebtSummaryItem) => {
              // console.log("row", row);
              return (
                <Flex gap="lg" justify="center">
                  {row.status !== "done" && <ButtonReversedJournal size={2.2} onClick={() => handleSendClick(row)} />}

                  <ButtonDeleteWithConfirmation
                    id={row.id} // Gunakan id customer
                    onDelete={() => handleDeleteDataJournal(row.journal_entry_id)}
                    description={`Hapus Transaksi ${row.description}?`}
                    size={2.2}
                  />
                </Flex>
              );
            },
          },
        ]}
      />

      {totalPages > 0 && (
        <Stack gap="xs" mt={"md"} style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={pageOutstandingDebt} onChange={setPageOutstandingDebt} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {outstandingDebtData?.data.total} data
          </Text>
        </Stack>
      )}

      {selectedDebt && companyId && (
        <ReversedJournalEntryModal
          companyId={companyId}
          transactionType="payout"
          selectedDebt={selectedDebt}
          opened={isModalOpen}
          close={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
};

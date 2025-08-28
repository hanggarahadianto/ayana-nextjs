import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import AddTransactionCategoryModal from "./AddTransactionCategoryModal";
import { IconPencil } from "@tabler/icons-react";
import { useModalStore } from "@/store/modalStore";
import { useDeleteDataTransactionCategory } from "@/api/transaction-category/deleteDataTransactionCategory";
import UpdateTransactionCategory from "./UpdateTransactionCategory";
import { getDataTransactionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import { accountTypeOptions, paymentStatus, transactionTypeOptions } from "@/constants/dictionary";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";
import BreathingActionIcon from "@/components/common/button/ButtonActionGo";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const TransactionCategoryCard = ({ companyId, companyName }: AccountCardProps) => {
  const { user } = useLoggedInUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDebitAccount, setSelectedDebitAccount] = useState<string | null>(null);
  const [selectedCreditAccount, setSelectedCreditAccount] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>("");

  const queryEnabled = !!user && !!companyId;

  const {
    data: transactionCategoryData,
    isPending: isLoadingGetTransactionCategory,
    refetch: refetchTransactionCategoryData,
  } = useQuery({
    queryKey: ["getTransactionCategory", companyId, page, limit, selectedType, selectedDebitAccount, selectedCreditAccount, selectedStatus],
    queryFn: () =>
      getDataTransactionCategory({
        companyId: companyId as string,
        page,
        limit,
        transactionType: selectedType,
        selectedDebitAccount,
        selectedCreditAccount,
        status: selectedStatus, // bisa juga dihapus kalau tidak dipakai
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, transactionCategoryData?.total || 0);

  const openEditModal = (transactionCategory: ITransactionCategory) => {
    useModalStore.getState().openModal("editTransactionCategory", transactionCategory);
  };

  const { mutate: mutateDeleteDataTransactionCategory, isPending: isLoadingDeleteTransactionCategory } = useDeleteDataTransactionCategory();
  const handleDeleteAccount = (idToDelete: string) => {
    mutateDeleteDataTransactionCategory(idToDelete);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingGetTransactionCategory} />
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Transaksi Kategori {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddTransactionCategoryModal companyId={companyId} refetchTransactionCategoryData={refetchTransactionCategoryData} />
          </Stack>
        </Group>
        <Group>
          <Select
            label="Filter Berdasarkan Tipe Akun (Debit)"
            placeholder="Pilih Type"
            data={accountTypeOptions}
            value={selectedDebitAccount}
            onChange={(value) => setSelectedDebitAccount(value)} // value: string | null
            clearable
            style={{ width: 250 }}
          />

          <Select
            label="Filter Berdasarkan Tipe Akun (Kredit)"
            placeholder="Pilih Type"
            data={accountTypeOptions}
            value={selectedCreditAccount}
            onChange={(value) => setSelectedCreditAccount(value)} // value: string | null
            clearable
            style={{ width: 250 }}
          />
          <Select
            label="Filter Berdasarkan Tipe Transaksi"
            placeholder="Pilih Type"
            data={transactionTypeOptions}
            value={selectedType}
            onChange={(value) => {
              setSelectedType(value);
            }}
            clearable
            style={{ width: 250 }}
          />

          <Select
            label="Filter Status Pembayaran"
            placeholder="Pilih Status"
            data={paymentStatus}
            value={selectedStatus}
            onChange={(value) => {
              setSelectedStatus(value);
            }}
            clearable
            style={{ width: 250 }}
          />
        </Group>
      </Stack>

      <TableComponent<ITransactionCategory>
        startIndex={startIndex}
        data={(transactionCategoryData?.data || []).map((item: ITransactionCategory) => ({
          ...item,
        }))}
        height={"580"}
        columns={[
          {
            key: "name",
            title: "Nama",
            width: 400,
            minWidth: 400,
            render: (row) => {
              const statusLabel = row.status === "paid" ? "Tunai" : row.status === "unpaid" ? "Tenor" : row.status || "";

              return `${row.transaction_label} ${row.name} ( ${statusLabel} )`;
            },
          },
          { key: "debit_category", title: "Debit Kategori", width: 160, minWidth: 160 },
          { key: "credit_category", title: "Kredit Kategori", width: 160, minWidth: 160 },
          {
            key: "status",
            title: "Status",
            width: 60,
            minWidth: 60,
            render: (row) => {
              if (row.status === "paid") return "TUNAI";
              if (row.status === "unpaid") return "TENOR";
              return row.status?.toUpperCase() || "";
            },
          },
          { key: "transaction_type", title: "Tipe Transaksi", width: 100, minWidth: 10 },
          { key: "debit_account_type", title: "Debit", width: 100, minWidth: 100 },
          { key: "credit_account_type", title: "Kredit", width: 100, minWidth: 100 },
          { key: "description", title: "Deskripsi", width: 320, minWidth: 320 },
          {
            key: "aksi",
            title: "Aksi",
            width: 120,
            minWidth: 60,
            render: (row: ITransactionCategory) => (
              <Group gap="lg" justify="center">
                <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
                <ButtonDeleteWithConfirmation
                  isLoading={isLoadingDeleteTransactionCategory}
                  onDelete={() => handleDeleteAccount(row.id)}
                  description={`Hapus Kategori Transaksi ${row.name}?`}
                  size={2.2}
                />
              </Group>
            ),
          },
        ]}
      />

      <UpdateTransactionCategory companyId={companyId} initialValues={useModalStore((state) => state.modalData)} />

      <PaginationWithLimit
        total={transactionCategoryData?.total ?? 0}
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
  );
};

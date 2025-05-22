import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useMemo, useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import AddTransactionCategoryModal from "./AddTransactionCategoryModal";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { IconPencil } from "@tabler/icons-react";
import { useModalStore } from "@/store/modalStore";
import { useDeleteDataTransactionCategory } from "@/api/transaction-category/deleteDataTransactionCategory";
import UpdateTransactionCategory from "./UpdateTransactionCategory";
import { getDataTransactionCategory } from "@/api/transaction-category/getDataTransactionCategory";

interface AccountCardProps {
  companyId: string;
}

export const TransactionCategoryCard = ({ companyId }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>("");

  const {
    data: transactionCategoryData,
    isPending: isLoadingGetTransactionCategory,
    refetch: refetchTransactionCategoryData,
  } = useQuery({
    queryKey: ["getTransactionCategory", companyId, page, selectedType, selectedCategory, true],
    queryFn: () =>
      getDataTransactionCategory({
        companyId: companyId as string,
        page,
        limit,
        transactionType: selectedType,
        category: selectedCategory,
        status: null, // bisa juga dihapus kalau tidak dipakai
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  // console.log("transaction category", transactionCategoryData);

  const totalPages = useMemo(() => {
    return transactionCategoryData?.total ? Math.ceil(transactionCategoryData.total / limit) : 1;
  }, [transactionCategoryData]);

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
      <LoadingGlobal visible={isLoadingGetTransactionCategory || isLoadingDeleteTransactionCategory} />
      <Stack align="flex-end" mb={16}>
        <AddTransactionCategoryModal companyId={companyId} refetchTransactionCategoryData={refetchTransactionCategoryData} />
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
          { key: "category", title: "Kategori", width: 160, minWidth: 160 },
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
                  id={row.id} // Gunakan id customer
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

      {totalPages > 0 && (
        <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {transactionCategoryData?.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

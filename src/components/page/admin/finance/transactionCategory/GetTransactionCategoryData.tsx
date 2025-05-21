import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useMemo, useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import AddTransactionCategoryModal from "./AddTransactionCategoryModal";
import { getDataTranasctionCategory } from "@/api/transaction-category/getDataTransactionCategory";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { IconPencil } from "@tabler/icons-react";
import { useModalStore } from "@/store/modalStore";
import { useDeleteDataTransactionCategory } from "@/api/transaction-category/deleteDataTransactionCategory";
import UpdateTransactionCategory from "./UpdateTransactionCategory";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const TransactionCategoryCard = ({ companyId, companyName }: AccountCardProps) => {
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
      getDataTranasctionCategory(
        companyId,
        page,
        limit,
        selectedType,
        selectedCategory,
        null, // status
        true // all
      ),

    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

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

      <TableComponent
        companyName={companyName}
        startIndex={startIndex}
        data={(transactionCategoryData?.data || []).map((item) => ({
          ...item,
          transaction_type: item.transaction_type?.toUpperCase() || "",
        }))}
        title="Kategori Transaksi"
        height={"580"}
        columns={[
          { key: "name", title: "Nama", width: 240, minWidth: 240 },
          { key: "category", title: "Kategori", width: 160, minWidth: 160 },
          { key: "transaction_type", title: "Tipe Transaksi", width: 100, minWidth: 10 },
          { key: "debit_account_type", title: "Debit", width: 100, minWidth: 100 },
          { key: "credit_account_type", title: "Kredit", width: 100, minWidth: 100 },
          { key: "description", title: "Deskripsi", width: 220, minWidth: 220 },
          {
            key: "aksi",
            title: "Aksi",
            width: 90,
            minWidth: 40,
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

      <UpdateTransactionCategory initialValues={useModalStore((state) => state.modalData)} />

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

import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Group, Flex, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { getDataAccount } from "@/api/account/getDataAccount";
import { useEffect, useMemo, useState } from "react";
import AddAccountModal from "./AddAccountModal";
import TableComponent from "@/components/common/table/TableComponent";
import { useModalStore } from "@/store/modalStore";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";
import { useDeleteDataAccount } from "@/api/account/deleteDataAccount";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import UpdateAccountModal from "./UpdateAccountModal";
import { accountTypeOptions } from "@/constants/dictionary";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const AccountCard = ({ companyId, companyName }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: accountData,
    isPending: isLoadingGetAccount,
    refetch: refetchAccountData,
  } = useQuery({
    queryKey: ["getAccountData", companyId, page, limit, selectedType],
    queryFn: () =>
      getDataAccount({
        companyId: companyId || "",
        page,
        limit,
        selectedType,
        all: false,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const accountList = accountData?.data ?? [];

  const totalPages = useMemo(() => {
    return accountData?.total ? Math.ceil(accountData.total / limit) : 1;
  }, [accountData]);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, accountData?.total || 0);

  const openEditModal = (account: IAccountUpdate) => {
    useModalStore.getState().openModal("editAccount", account);
  };

  const { mutate: mutateDeleteDataAccount, isPending: isLoadingDeleteAccount } = useDeleteDataAccount();
  const handleDeleteAccount = (idToDelete: string) => {
    mutateDeleteDataAccount(idToDelete);
  };

  return (
    <Card shadow="sm" padding="lg">
      <LoadingGlobal visible={isLoadingGetAccount || isLoadingDeleteAccount} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Akun keuangan {companyName}
          </Text>
          <Select
            label="Filter Berdasarkan Tipe Akun"
            placeholder="Pilih Type"
            data={accountTypeOptions}
            value={selectedType}
            onChange={(value) => {
              setSelectedType(value);
            }}
            clearable
            style={{ width: 250 }}
          />
        </Stack>
        <Stack align="flex-end" mb={16}>
          <AddAccountModal companyId={companyId} refetchAccountData={refetchAccountData} />
        </Stack>
      </Group>

      <TableComponent
        startIndex={startIndex}
        data={accountList}
        totalAmount={accountData?.total}
        height={"580"}
        columns={[
          { key: "code", title: "Code", width: 40, minWidth: 40 },
          { key: "name", title: "Nama", width: 160, minWidth: 160 },
          { key: "category", title: "Kategori", width: 140, minWidth: 140 },
          { key: "description", title: "Deskripsi", width: 280, minWidth: 280 },
          {
            key: "aksi",
            title: "Aksi",
            width: 10,
            minWidth: 10,
            render: (row: IAccountUpdate) => (
              <Flex gap="lg" justify="center">
                <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
                <ButtonDeleteWithConfirmation
                  id={row.id} // Gunakan id customer
                  onDelete={() => handleDeleteAccount(row.id)}
                  description={`Hapus Akun ${row.name}?`}
                  size={2.2}
                />
              </Flex>
            ),
          },
        ]}
      />

      <UpdateAccountModal initialValues={useModalStore((state) => state.modalData)} />

      {totalPages > 0 && (
        <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {accountData?.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

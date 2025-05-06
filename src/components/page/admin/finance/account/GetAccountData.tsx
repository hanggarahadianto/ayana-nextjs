import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { getDataAccount } from "@/api/account/getDataAccount";
import { useEffect, useMemo, useState } from "react";
import { accountTypeOptions, typeOptions } from "@/constants/dictionary";
import AddAccountModal from "./AddAccountModal";
import TableComponent from "@/components/common/table/TableComponent";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const AccountCard = ({ companyId, companyName }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const {
    data: accountData,
    isLoading,
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

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg">
        <LoadingGlobal visible={isLoading} />
        <Stack align="flex-end" mb={16}>
          <AddAccountModal companyId={companyId} refetchAccountData={refetchAccountData} />
        </Stack>

        {/* <Select
          label="Filter berdasarkan Type"
          placeholder="Pilih Type"
          data={accountTypeOptions}
          value={selectedType}
          onChange={(value) => {
            console.log("Select onChange:", value); // Debug
            setSelectedType(value);
          }}
          clearable
          style={{ width: 250 }}
        /> */}

        <TableComponent
          companyName={companyName}
          startIndex={startIndex}
          data={accountList}
          totalAmount={accountData?.total}
          title="Akun Keuangan"
          columns={[
            { key: "code", title: "Code", width: 40, minWidth: 40 },
            { key: "name", title: "Nama", width: 160, minWidth: 160 },
            { key: "category", title: "Kategori", width: 140, minWidth: 140 },
            { key: "description", title: "Deskripsi", width: 180, minWidth: 180 },
          ]}
        />

        {totalPages > 0 && (
          <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
            <Pagination total={totalPages} value={page} onChange={setPage} />
            <Text size="sm" c="dimmed">
              Menampilkan {startIndex} sampai {endIndex} dari {accountData?.total} data
            </Text>
          </Stack>
        )}
      </Card>
    </SimpleGridGlobal>
  );
};

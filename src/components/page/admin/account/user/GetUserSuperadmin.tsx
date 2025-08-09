import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // assumed path
import LoadingGlobal from "@/styles/loading/loading-global";
import TableComponent from "@/components/common/table/TableComponent";
import { useCookies } from "@/utils/hook/useCookies";
import { useModalStore } from "@/store/modalStore";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { useDebounce } from "use-debounce";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { useDeleteDataCompanyByUser } from "@/api/company/deleteDataCompany";
import { columnsBaseUser } from "./UserColumn";
import { getUserByIdForSuperadmin } from "@/api/user/getUserDataForSuperadmin";
import AddUserModal from "./AddUserModal";

interface userForSuperadminTableProps {
  companyId: string;
  companyName?: string;
}
export const UserForSuperadminTable = ({ companyId, companyName }: userForSuperadminTableProps) => {
  const { getToken } = useCookies();
  const { user } = useLoggedInUser();
  // console.log("user", user);

  const token = getToken();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statuscompanyById, setStatuscompanyById] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!token && !!companyId;

  const {
    data: userByIdData,
    isLoading: isLoadingUserData,
    refetch: refetchUserById,
    isFetching: isFetchingUserData,
  } = useQuery({
    queryKey: ["getUserByIdData", user?.id],
    queryFn: () => getUserByIdForSuperadmin({ id: user?.id }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const userList = userByIdData?.data.userList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, userByIdData?.data.total_data || 0);

  const { mutate: mutateDeleteDatacompanyById, isPending: isLoadingDeletecompanyById } = useDeleteDataCompanyByUser();
  const handleDeleteCompanyByUser = (idToDelete: string) => {
    mutateDeleteDatacompanyById(idToDelete);
  };

  const openEditModal = (companyById: any) => {
    useModalStore.getState().openModal("editcompanyById", companyById);
  };
  const columns = columnsBaseUser(openEditModal, handleDeleteCompanyByUser);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Pengguna {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddUserModal refetchUserData={refetchUserById} />
          </Stack>
        </Group>
        <Group>
          <Stack w={400}>
            {/* <SelectcompanyByIdFilter companyId={companyId} value={statuscompanyById} onChange={setStatuscompanyById} /> */}
          </Stack>
          {/* <SearchTable
            label={"Cari Data Perusahaan"}
            companyId={""}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            transactionType={null}
            debitAccountType={null}
            creditAccountType={null}
            readonly={false}
            useCategory={false}
            onRefresh={isRefetchCompanyData}
            isFetching={isFetchingcompanyByIdData}
          /> */}
        </Group>
      </Stack>

      <Box style={{ position: "relative" }}>
        {isLoadingUserData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={userList}
            totalAmount={userByIdData?.data.total_data}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingUserData} />
      </Box>
      {/* <EditcompanyByIdModal companyId={companyId} initialData={useModalStore((state) => state.modalData)} /> */}

      {!isLoadingUserData && (
        <PaginationWithLimit
          total={userByIdData?.data.total_data ?? 0}
          page={page}
          limit={limit}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}
    </Card>
  );
};

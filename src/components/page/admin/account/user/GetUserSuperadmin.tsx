import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // assumed path
import LoadingGlobal from "@/styles/loading/loading-global";
import TableComponent from "@/components/common/table/TableComponent";
import { useModalStore } from "@/store/modalStore";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { useDeleteDataCompanyByUser } from "@/api/company/deleteDataCompany";
import { columnsBaseUser } from "./UserColumn";
import { getUserByIdForSuperadmin } from "@/api/user/getUserDataForSuperadmin";
import AddUserModal from "./AddUserModal";
import UpdateUserByIdModal from "./UpdateUserModal";

interface userForSuperadminTableProps {
  companyId: string;
  companyName?: string;
}
export const UserForSuperadminTable = ({ companyId, companyName }: userForSuperadminTableProps) => {
  const { user } = useLoggedInUser();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!user && !!companyId;

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

  const openEditModal = (user: IUserUpdate) => {
    useModalStore.getState().openModal("editUser", user);
  };
  const columns = columnsBaseUser(openEditModal, handleDeleteCompanyByUser, isLoadingDeletecompanyById);

  return (
    <Card shadow="sm" padding="lg" w={"full"}>
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Pengguna {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddUserModal refetchUserData={refetchUserById} />
          </Stack>
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
      <UpdateUserByIdModal initialValues={useModalStore((state) => state.modalData)} />

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

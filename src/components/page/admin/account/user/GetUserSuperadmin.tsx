import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingGlobal from "@/styles/loading/loading-global";
import TableComponent from "@/components/common/table/TableComponent";
import { useModalStore } from "@/store/modalStore";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { columnsBaseUser } from "./UserColumn";
import { getUserByIdForSuperadmin } from "@/api/user/getUserDataForSuperadmin";
import AddUserModal from "./AddUserModal";
import UpdateUserByIdModal from "./UpdateUserModal";
import { useDeleteDataUser } from "@/api/user/deleteDataUser";

interface UserForSuperadminTableProps {
  companyId: string;
  companyName?: string;
}

export const UserForSuperadminTable = ({ companyId, companyName }: UserForSuperadminTableProps) => {
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
    isError: isErrorUserById,
    error: errorUserById,
  } = useQuery({
    queryKey: ["getUserByIdData", user?.id],
    queryFn: () => getUserByIdForSuperadmin({ id: user?.id }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
    retry: false, // error langsung dilempar
  });

  const userList = userByIdData?.data?.userList ?? [];
  const totalData = userByIdData?.data?.total_data ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalData);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteDataUser();
  const handleDelete = (id: string) => deleteUser(id);

  const openEditModal = (user: IUserUpdate) => {
    useModalStore.getState().openModal("editUser", user);
  };

  const columns = columnsBaseUser(openEditModal, handleDelete, isDeleting);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Pengguna {companyName}
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
          <Box style={{ position: "relative" }}>
            <TableComponent
              startIndex={startIndex}
              data={isErrorUserById ? [] : userList}
              totalAmount={isErrorUserById ? 0 : totalData}
              height={"580"}
              columns={columns}
            />

            {isErrorUserById && (
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backdropFilter: "blur(6px)",
                  backgroundColor: "rgba(0,0,0,0.6)", // lebih gelap
                  color: "white",
                  zIndex: 1,
                }}
              >
                <Text size="xl" fw={700} c="red">
                  Superadmin Only
                </Text>
              </Box>
            )}
          </Box>
        )}

        <LoadingGlobal visible={isLoadingUserData} />
      </Box>

      <UpdateUserByIdModal initialValues={useModalStore((state) => state.modalData)} />

      {!isLoadingUserData && !isErrorUserById && (
        <PaginationWithLimit
          total={totalData}
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

import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import LoadingGlobal from "@/styles/loading/loading-global";
import TableComponent from "@/components/common/table/TableComponent";
import { useModalStore } from "@/store/modalStore";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import AddCompanyModal from "./AddCompanyModal";
import { columnsBaseCompany } from "./CompanyColumn";
import { getDataCompanyByUser } from "@/api/company/getCompanyByUser";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { useDeleteDataCompanyByUser } from "@/api/company/deleteDataCompany";
import UpdateCompanyModal from "./UpdateCompanyModal";
import { useState } from "react";
import AssignUserHandleCompany from "./AssignUserHandleCompany";

export const CompanyByUserTable = () => {
  const { user } = useLoggedInUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!user;

  const {
    data: companyByIdData,
    isLoading: isLoadingCompanyData,
    refetch: isRefetchCompanyByIdData,
    isFetching: isFetchingcompanyByIdData,
  } = useQuery({
    queryKey: [
      "getCompanyByIdData", // supaya kalau user berubah, data ikut refetch
      user?.id,
      page,
      limit,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getDataCompanyByUser({
        user_id: user?.id ?? "",
        page,
        limit,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const companyByIdList = companyByIdData?.data.companyList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, companyByIdData?.data.total_company || 0);

  const { mutate: mutateDeleteDatacompanyById, isPending: isLoadingDeletecompanyById } = useDeleteDataCompanyByUser();
  const handleDeleteCompanyByUser = (idToDelete: string) => {
    mutateDeleteDatacompanyById(idToDelete, {
      onSettled: () => {},
    });
  };

  const openEditModal = (companyData: ICompanyItem) => {
    useModalStore.getState().openModal("editCompany", companyData);
  };
  const openAssignModal = (companyData: ICompanyItem) => {
    useModalStore.getState().openModal("assignUser", companyData);
  };

  const columns = columnsBaseCompany(openEditModal, openAssignModal, handleDeleteCompanyByUser, isLoadingDeletecompanyById);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Perusahaan {""}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddCompanyModal refetchCompanyData={isRefetchCompanyByIdData} />
          </Stack>
        </Group>
      </Stack>
      <LoadingGlobal visible={isLoadingCompanyData} />
      <Box style={{ position: "relative" }}>
        {isLoadingCompanyData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={companyByIdList}
            totalAmount={companyByIdData?.data.total_company}
            height={"580"}
            columns={columns}
          />
        )}
      </Box>
      <UpdateCompanyModal />
      <AssignUserHandleCompany />
      {!isLoadingCompanyData && (
        <PaginationWithLimit
          total={companyByIdData?.data.total_company ?? 0}
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
{
}

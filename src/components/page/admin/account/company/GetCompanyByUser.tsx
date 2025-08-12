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
import AddCompanyModal from "./AddCompanyModal";
import { columnsBaseCompany } from "./CompanyColumn";
import { getDataCompany } from "@/api/company/getCompany";
import { getDataCompanyByUser } from "@/api/company/getCompanyByUser";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { useDeleteDataCompanyByUser } from "@/api/company/deleteDataCompany";
import UpdateCompanyModal from "./UpdateCompanyModal";

interface companyByIdTableProps {
  companyId: string;
  companyName?: string;
}
export const CompanyByUserTable = ({ companyId, companyName }: companyByIdTableProps) => {
  const { user } = useLoggedInUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [statuscompanyById, setStatuscompanyById] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!user && !!companyId;

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
      debouncedSearch,
      statuscompanyById,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
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
    mutateDeleteDatacompanyById(idToDelete);
  };

  const openEditModal = (companyById: any) => {
    useModalStore.getState().openModal("editCompany", companyById);
  };
  const columns = columnsBaseCompany(openEditModal, handleDeleteCompanyByUser, isLoadingDeletecompanyById);

  console.log("loading", isLoadingCompanyData);

  return (
    <Card shadow="sm" padding="lg" w={"full"}>
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Perusahaan {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddCompanyModal companyId={companyId} refetchCompanyData={isRefetchCompanyByIdData} />
          </Stack>
        </Group>
      </Stack>

      <Box style={{ position: "relative" }}>
        {isFetchingcompanyByIdData ? (
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

        <LoadingGlobal visible={isLoadingCompanyData} />
      </Box>
      <UpdateCompanyModal initialValues={useModalStore((state) => state.modalData)} />

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

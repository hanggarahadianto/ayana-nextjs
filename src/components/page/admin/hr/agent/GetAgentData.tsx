import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useCallback, useMemo, useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { useDebounce } from "use-debounce";
import { getDataEmployee } from "@/api/employee/getDataEmployee";
import { useDeleteDataEmployee } from "@/api/employee/deleteDataEmployee";
import TableComponent from "@/components/common/table/TableComponent";
import { columnsBaseAgent } from "./AgentColumn";
import LoadingGlobal from "@/styles/loading/loading-global";
import AddAgentModal from "./AddAgentModal";
import EditAgentModal from "./EditAgentModal";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

interface EmployeeTableProps {
  companyId: string;
  companyName?: string;
}
export const AgentTable = ({ companyId, companyName }: EmployeeTableProps) => {
  const { user } = useLoggedInUser(); // atau "/login"

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!user && !!companyId;
  const isAgent = true;

  const {
    data: EmployeeData,
    isLoading: isLoadingEmployeeData,
    refetch: isRefetchEmployeeData,
    isFetching: isFetchingEmployeeData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getEmployeeData",
      companyId,
      page,
      limit,
      selectedCategory,
      debouncedSearch,
      isAgent,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getDataEmployee({
        companyId: companyId!,
        page,
        limit,
        search: debouncedSearch,
        isAgent,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortBy,
        sortOrder,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const employeeList = EmployeeData?.data.employeeList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, EmployeeData?.data.total || 0);

  const { mutate: mutateDeleteDataEmployee, isPending: isLoadingDeleteEmployee } = useDeleteDataEmployee(isRefetchEmployeeData);
  const handleDeleteEmployee = useCallback(
    (idToDelete: string) => {
      mutateDeleteDataEmployee(idToDelete);
    },
    [mutateDeleteDataEmployee]
  );

  const openEditModal = useCallback((Employee: any) => {
    useModalStore.getState().openModal("editAgent", Employee);
  }, []);

  const columns = useMemo(() => columnsBaseAgent(openEditModal, handleDeleteEmployee), [openEditModal, handleDeleteEmployee]);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Agent {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddAgentModal companyId={companyId} />
          </Stack>
        </Group>

        <SearchTable
          label={"Cari Data Karyawan"}
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          transactionType={null}
          debitAccountType={null}
          creditAccountType={null}
          readonly={false}
          useCategory={false}
          onRefresh={isRefetchEmployeeData}
          isFetching={isFetchingEmployeeData}
          useDateFilter={false} // 👉 untuk menyembunyikan filter tanggal
        />
      </Stack>

      <Box style={{ position: "relative" }}>
        {isLoadingEmployeeData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={employeeList}
            totalAmount={EmployeeData?.data.total_employee}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingEmployeeData || isLoadingDeleteEmployee} />
      </Box>
      <EditAgentModal companyId={companyId} initialValues={useModalStore((state) => state.modalData)} />

      {!isLoadingEmployeeData && (
        <PaginationWithLimit
          total={EmployeeData?.data.total ?? 0}
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

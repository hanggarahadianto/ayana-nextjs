import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // assumed path
import LoadingGlobal from "@/styles/loading/loading-global";
import TableComponent from "@/components/common/table/TableComponent";
import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { useCookies } from "@/utils/hook/useCookies";
import { useDeleteDataCustomer } from "@/api/customer/deleteDataCustomer";
import { useModalStore } from "@/store/modalStore";
import EditCustomerModal from "./UpdateCustomerModal";
import AddMarketingModal from "./AddCustomerModal";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { useDebounce } from "use-debounce";
import { columnsBaseCustomer } from "./CustomerColumn";
import SelectCustomerFilter from "@/components/common/select/SelectCustomerStatus";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

interface CustomerTableProps {
  companyId: string;
  companyName?: string;
}
export const CustomerTable = ({ companyId, companyName }: CustomerTableProps) => {
  const { user } = useLoggedInUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [statusCustomer, setStatusCustomer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!user && !!companyId;

  const {
    data: customerData,
    isLoading: isLoadingCustomerData,
    refetch: isRefetchCustomerData,
    isFetching: isFetchingCustomerData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getCustomerData",
      companyId,
      page,
      limit,
      debouncedSearch,
      statusCustomer,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getDataCustomer({
        companyId: companyId!,
        page,
        limit,
        search: debouncedSearch,
        statusCustomer: statusCustomer ?? undefined, // ✅ kirim ke backend
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortBy,
        sortOrder,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const customerList = customerData?.data.customerList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, customerData?.data.total || 0);

  const { mutate: mutateDeleteDataCustomer, isPending: isLoadingDeleteCustomer } = useDeleteDataCustomer(isRefetchCustomerData);
  const handleDeleteCustomer = (idToDelete: string) => {
    mutateDeleteDataCustomer(idToDelete);
  };

  const openEditModal = (customer: any) => {
    useModalStore.getState().openModal("editCustomer", customer);
  };
  const columns = columnsBaseCustomer(openEditModal, handleDeleteCustomer);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Konsumen {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddMarketingModal companyId={companyId} />
          </Stack>
        </Group>
        <Group>
          <Stack w={400}>
            <SelectCustomerFilter companyId={companyId} value={statusCustomer} onChange={setStatusCustomer} />
          </Stack>
          <SearchTable
            label={"Cari Data Konsumen"}
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
            onRefresh={isRefetchCustomerData}
            isFetching={isFetchingCustomerData}
          />
        </Group>
      </Stack>

      <Box style={{ position: "relative" }}>
        {isLoadingCustomerData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={customerList}
            totalAmount={customerData?.data.total_customer}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingCustomerData || isLoadingDeleteCustomer} />
      </Box>
      <EditCustomerModal companyId={companyId} initialData={useModalStore((state) => state.modalData)} />

      {!isLoadingCustomerData && (
        <PaginationWithLimit
          total={customerData?.data.total ?? 0}
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

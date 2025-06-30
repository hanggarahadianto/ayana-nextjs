import { Card, Text, Stack, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { useCookies } from "@/utils/hook/useCookies";
import { useDeleteDataCustomer } from "@/api/customer/deleteDataCustomer";
import { useModalStore } from "@/store/modalStore";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";

import SearchTable from "@/components/common/table/SearchTableComponent";
import { useDebounce } from "use-debounce";
import AddEmployeeModal from "./AddEmployeeModal";

interface CustomerTableProps {
  companyId: string;
  companyName?: string;
}
export const HumanResourceTable = ({ companyId, companyName }: CustomerTableProps) => {
  const { getToken } = useCookies();
  const token = getToken();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed";

  const queryEnabled = !!token && !!companyId;

  const {
    data: customerData,
    isLoading: isLoadingCustomerData,
    refetch: refetchCustomerData,
  } = useQuery({
    queryKey: [
      "getCustomerData",
      companyId,
      page,
      limit,
      selectedCategory,
      debouncedSearch,
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
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortBy,
        sortOrder,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const customerList = customerData?.data.customerList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, customerData?.data.total || 0);

  const { mutate: mutateDeleteDataCustomer, isPending: isLoadingDeleteCustomer } = useDeleteDataCustomer(refetchCustomerData);
  const handleDeleteCustomer = (idToDelete: string) => {
    mutateDeleteDataCustomer(idToDelete);
  };

  const openEditModal = (customer: any) => {
    useModalStore.getState().openModal("editCustomer", customer);
  };
  //   const columns = columnsBaseMarketing(openEditModal, handleDeleteCustomer);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Karyawan {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddEmployeeModal companyId={companyId} />
          </Stack>
        </Group>

        <SearchTable
          label={"Cari Data Karyawan"}
          companyId={""}
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
        />
      </Stack>

      {/* <Box style={{ position: "relative" }}>
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
      </Box> */}
      {/* <EditCustomerModal companyId={companyId} initialData={useModalStore((state) => state.modalData)} /> */}

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

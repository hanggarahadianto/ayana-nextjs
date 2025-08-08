import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // assumed path
import LoadingGlobal from "@/styles/loading/loading-global";
import TableComponent from "@/components/common/table/TableComponent";
import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { useCookies } from "@/utils/hook/useCookies";
import { useDeleteDataCustomer } from "@/api/customer/deleteDataCustomer";
import { useModalStore } from "@/store/modalStore";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { useDebounce } from "use-debounce";
import SelectCustomerFilter from "@/components/common/select/SelectCustomerStatus";
import AddCompanyModal from "./AddCompanyModal";
import { columnsBaseCompany } from "./CompanyColumn";
import { getDataCompany } from "@/api/company/getCompany";
import { getDataCompanyByUser } from "@/api/company/getCompanyByUser";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

interface CustomerTableProps {
  companyId: string;
  companyName?: string;
}
export const CompanyByUserTable = ({ companyId, companyName }: CustomerTableProps) => {
  const { getToken } = useCookies();
  const { user } = useLoggedInUser();
  console.log("user", user);

  const token = getToken();
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

  const queryEnabled = !!token && !!companyId;

  const {
    data: customerData,
    isLoading: isLoadingCompanyData,
    refetch: isRefetchCompanyData,
    isFetching: isFetchingCustomerData,
  } = useQuery({
    queryKey: [
      "getCompanyData", // supaya kalau user berubah, data ikut refetch
      user?.ID,
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
      getDataCompany({
        user_id: user?.ID,
        page,
        limit,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const customerList = customerData?.data.companyList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, customerData?.data.total_data || 0);

  const { mutate: mutateDeleteDataCustomer, isPending: isLoadingDeleteCustomer } = useDeleteDataCustomer(isRefetchCompanyData);
  const handleDeleteCustomer = (idToDelete: string) => {
    mutateDeleteDataCustomer(idToDelete);
  };

  const openEditModal = (customer: any) => {
    useModalStore.getState().openModal("editCustomer", customer);
  };
  const columns = columnsBaseCompany(openEditModal, handleDeleteCustomer);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Perusahaan {""} {companyName}
          </Text>
          <Stack align="flex-end" mb={16}>
            <AddCompanyModal companyId={companyId} refetchCompanyData={isRefetchCompanyData} />
          </Stack>
        </Group>
        <Group>
          <Stack w={400}>
            <SelectCustomerFilter companyId={companyId} value={statusCustomer} onChange={setStatusCustomer} />
          </Stack>
          <SearchTable
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
            isFetching={isFetchingCustomerData}
          />
        </Group>
      </Stack>

      <Box style={{ position: "relative" }}>
        {isLoadingCompanyData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={customerList}
            totalAmount={customerData?.data.total_data}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingCompanyData || isLoadingDeleteCustomer} />
      </Box>
      {/* <EditCustomerModal companyId={companyId} initialData={useModalStore((state) => state.modalData)} /> */}

      {!isLoadingCompanyData && (
        <PaginationWithLimit
          total={customerData?.data.total_data ?? 0}
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

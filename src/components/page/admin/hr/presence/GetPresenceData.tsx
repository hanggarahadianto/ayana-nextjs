import { Card, Text, Stack, Group, Box, Skeleton, Grid, GridCol, Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "@/utils/hook/useCookies";
import { useModalStore } from "@/store/modalStore";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { useDebounce } from "use-debounce";
import { useDeleteDataEmployee } from "@/api/employee/deleteDataEmployee";
import TableComponent from "@/components/common/table/TableComponent";
import LoadingGlobal from "@/styles/loading/loading-global";
import UploadPresence from "./UploadPresence";
import { getDataPresence } from "@/api/employee/getDataPresence";
import { columnsBasePresence } from "./PresenceColumn";
import { useListState } from "@mantine/hooks";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { useDeleteDataPresenceRule } from "@/api/employee/deletePresenceRule";

interface PresenceTableProps {
  companyId: string;
  companyName?: string;
  presenceRuleList: IPresenceRuleItem[];
}
export const PresenceTable = ({ companyId, companyName, presenceRuleList }: PresenceTableProps) => {
  const { getToken } = useCookies();
  const token = getToken();
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

  const queryEnabled = !!token && !!companyId;
  const isAgent = false;
  const {
    data: presenceData,
    isLoading: isLoadingPresenceData,
    refetch: isRefetchPresenceData,
    isFetching: isFetchingPresenceData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getPresenceData",
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
      getDataPresence({
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

  const presenceList = presenceData?.data.presenceList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, presenceData?.data.total || 0);

  const { mutate: mutateDeleteDataPresence, isPending: isLoadingDeletePrensece } = useDeleteDataPresenceRule(isRefetchPresenceData);
  const handleDeletePresence = useCallback(
    (idToDelete: string) => {
      mutateDeleteDataPresence(idToDelete);
    },
    [mutateDeleteDataPresence]
  );

  const openEditModal = useCallback((Presence: any) => {
    useModalStore.getState().openModal("editPresence", Presence);
  }, []);

  const [checkboxStates, checkboxHandlers] = useListState<{ id: string; checked: boolean; key: string }>([]);
  const total = checkboxStates.length;
  const selectedCount = checkboxStates.filter((c) => c.checked).length;
  const allChecked = selectedCount === total && total > 0;
  const indeterminate = selectedCount > 0 && selectedCount < total;

  useEffect(() => {
    if (presenceList.length > 0) {
      checkboxHandlers.setState(
        presenceList.map((item) => ({
          id: item.id,
          key: item.id + Math.random().toString(), // tambahkan unique key
          checked: false,
        }))
      );
    }
  }, [presenceList]);

  const columns = useMemo(
    () => columnsBasePresence(openEditModal, handleDeletePresence, checkboxStates, checkboxHandlers, presenceRuleList),
    [openEditModal, handleDeletePresence, checkboxStates, checkboxHandlers, presenceRuleList]
  );

  //   console.log(presenceList);

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Grid>
          <GridCol span={8}>
            <Stack>
              <Stack>
                <Text size="xl" fw={600} mb={20}>
                  Daftar Presensi {""} {companyName}
                </Text>
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
                  onRefresh={isRefetchPresenceData}
                  isFetching={isFetchingPresenceData}
                  useDateFilter={true} // 👉 untuk menyembunyikan filter tanggal
                />
              </Stack>
            </Stack>
          </GridCol>
          <GridCol span={4}>
            <Stack>
              <UploadPresence />
            </Stack>
          </GridCol>
        </Grid>
      </Stack>

      <Stack mt={"16px"} p={10}>
        <Group justify="space-between">
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            label="Pilih semua transaksi"
            mb="sm"
            onChange={() =>
              checkboxHandlers.setState((current) =>
                current.map((value) => ({
                  ...value,
                  checked: !allChecked,
                }))
              )
            }
          />
          {selectedCount > 0 && (
            <></>
            // <ButtonDeleteWithConfirmation
            //   size={2.5}
            //   id={""}
            //   onDelete={() => {
            //     const selectedIds = checkboxStates.filter((c) => c.checked).map((c) => c.id);
            //     mutateDeleteDataPresence(selectedIds);
            //   }}
            //   description={"Hapus yang ditandai"}
            // />
          )}
        </Group>
      </Stack>

      <Box style={{ position: "relative" }}>
        {isLoadingPresenceData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={presenceList}
            totalAmount={presenceData?.data.total_presence}
            height={"580"}
            columns={columns}
          />
        )}

        {/* <LoadingGlobal visible={isLoadingPresenceData || isLoadingDeleteEmployee} /> */}
      </Box>
      {/* <EditEmployeeModal companyId={companyId} initialValues={useModalStore((state) => state.modalData)} /> */}

      {!isLoadingPresenceData && (
        <PaginationWithLimit
          total={presenceData?.data.total ?? 0}
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

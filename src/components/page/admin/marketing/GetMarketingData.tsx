import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Badge, Group, Select, Box, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { useCookies } from "@/utils/hook/useCookies";
import { useDeleteDataCustomer } from "@/api/customer/deleteDataCustomer";
import { useModalStore } from "@/store/modalStore";
import EditCustomerModal from "./UpdateMarketingModal";
import AddMarketingModal from "./AddMarketingModal";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { columnsBaseMarketing } from "./MarketingColumn";

export const CustomerTable = () => {
  const { getToken } = useCookies();
  const token = getToken();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "repayment_date"; // bisa juga dari Select nanti

  const {
    data: customerData,
    isLoading: isLoadingCustomerData,
    refetch: refetchCustomerData,
  } = useQuery({
    queryKey: ["getCustomerData", page, limit, selectedType, formattedStartDate ?? null, formattedEndDate ?? null],
    queryFn: () =>
      getDataCustomer({
        page,
        limit,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  // console.log("customer list", customerList);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  // console.log("data", customerData);

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
  const columns = columnsBaseMarketing(openEditModal, handleDeleteCustomer);

  return (
    <Card shadow="sm" padding="lg">
      <LoadingGlobal visible={isLoadingCustomerData || isLoadingDeleteCustomer} />

      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Daftar Konsumen
          </Text>
          <Select
            label="Filter berdasarkan Type"
            placeholder="Pilih Type"
            value={selectedType}
            onChange={(value) => {
              setSelectedType(value);
            }}
            clearable
            style={{ width: 250 }}
          />
        </Stack>
        <Stack align="flex-end" mb={16}>
          <AddMarketingModal />
        </Stack>
      </Group>
      {/* <TableComponent
        startIndex={startIndex}
        data={customerList}
        totalAmount={customerData?.data.total_customer}
        height={"580"}
        columns={[
          { key: "name", title: "Nama", width: 200, minWidth: 200 },
          { key: "address", title: "Alamat", width: 240, minWidth: 240 },
          { key: "phone", title: "Nomor Telepon", width: 100, minWidth: 100 },

          {
            key: "home.title",
            title: "Produk",
            width: 260,
            minWidth: 260,
            render: (row: ICustomer) => row.home?.title ?? "-",
          },

          {
            key: "home.type",
            title: "Tipe",
            width: 90,
            minWidth: 90,
            render: (row: ICustomer) => row.home?.type ?? "-",
          },
          {
            key: "product_unit",
            title: "Unit",
            width: 90,
            minWidth: 90,
            render: (row: ICustomer) => row.product_unit ?? "-",
          },
          {
            key: "date_inputed",
            title: "Tanggal Transaksi",
            width: 200,
            minWidth: 200,
            render: (item) => formatDateIndonesia(item.date_inputed),
          },
          {
            key: "amount",
            title: "Nominal",
            width: 120,
            minWidth: 120,
            render: (row: ICustomer) => formatCurrency(row.amount) ?? "-",
          },
          {
            key: "marketer",
            title: "Marketing",
            width: 120,
            minWidth: 120,
            render: (row: ICustomer) => row.marketer ?? "-",
          },
          {
            key: "status",
            title: "Status",
            width: 280,
            minWidth: 280,
            render: (row: ICustomer) => {
              const colorMap: Record<string, string> = {
                booking: "yellow",
                bank_processing: "orange",
                approved_by_bank: "indigo",
                rejected_by_bank: "red",
                credit_agreement: "violet",
                under_construction: "pink",
                construction_completed: "cyan",
                handover: "teal",
                canceled: "gray",
              };

              const color = colorMap[row.status] ?? "gray";

              const statusLabel = houseSaleStatuses.find((s) => s.value === row.status)?.label ?? row.status;

              return (
                <Badge color={color} variant="filled" radius="sm">
                  {statusLabel}
                </Badge>
              );
            },
          },
          {
            key: "aksi",
            title: "Aksi",
            width: 100,
            minWidth: 100,
            render: (row: ICustomer) => (
              <Group gap="lg">
                <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size={"2.2rem"} />
                <ButtonDeleteWithConfirmation
                  id={row.id} // Gunakan id customer
                  onDelete={() => handleDeleteCustomer(row.id)}
                  description={`Hapus konsumen ${row.name}?`}
                  size={2.2}
                />
              </Group>
            ),
          },
        ]}
      /> */}

      <Box style={{ position: "relative" }}>
        {isLoadingCustomerData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={customerList}
            totalAmount={customerData?.data.total_customer}
            // transactionType={transactionType}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingCustomerData || isLoadingDeleteCustomer} />
      </Box>
      <EditCustomerModal initialData={useModalStore((state) => state.modalData)} />

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

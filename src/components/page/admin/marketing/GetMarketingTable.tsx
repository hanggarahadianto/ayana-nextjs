import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Badge, Group, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { useCookies } from "@/utils/hook/useCookies";
import { useDeleteDataCustomer } from "@/api/customer/deleteDataCustomer";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";
import { useModalStore } from "@/store/modalStore";
import EditCustomerModal from "./UpdateMarketingModal";

export const CustomerTable = () => {
  const { getToken } = useCookies();
  const token = getToken();

  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: customerData,
    isLoading: isLoadingCustomerData,
    refetch: refetchCustomerData,
  } = useQuery({
    queryKey: ["getCustomerData", page, limit, selectedType],
    queryFn: () =>
      getDataCustomer({
        page,
        limit,
      }),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  const customerList = customerData?.data ?? [];

  const totalPages = useMemo(() => {
    return customerData?.total ? Math.ceil(customerData.total / limit) : 1;
  }, [customerData]);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, customerData?.total || 0);

  const { mutate: mutateDeleteDataCustomer, isPending: isLoadingDeleteCustomer } = useDeleteDataCustomer(refetchCustomerData);
  const handleDeleteCustomer = (idToDelete: string) => {
    mutateDeleteDataCustomer(idToDelete);
  };

  const openEditModal = (customer: any) => {
    useModalStore.getState().openModal("editCustomer", customer);
  };

  return (
    <Card shadow="sm" padding="lg">
      <LoadingGlobal visible={isLoadingCustomerData || isLoadingDeleteCustomer} />

      {/* <Select
          label="Filter berdasarkan Type"
          placeholder="Pilih Type"
          data={accountTypeOptions}
          value={selectedType}
          onChange={(value) => {
            console.log("Select onChange:", value); // Debug
            setSelectedType(value);
          }}
          clearable
          style={{ width: 250 }}
        /> */}
      <TableComponent
        startIndex={startIndex}
        data={customerList}
        totalAmount={customerData?.total}
        title="Daftar Konsumen"
        columns={[
          { key: "name", title: "Nama", width: 200, minWidth: 200 },
          { key: "address", title: "Alamat", width: 240, minWidth: 240 },
          { key: "phone", title: "Nomor Telepon", width: 100, minWidth: 100 },

          {
            key: "home.title",
            title: "Produk",
            width: 260,
            minWidth: 260,
            render: (row: any) => row.home?.title ?? "-",
          },
          {
            key: "marketer",
            title: "Marketing",
            width: 120,
            minWidth: 120,
            render: (row: any) => row.marketer ?? "-",
          },
          {
            key: "status",
            title: "Status",
            width: 100,
            minWidth: 100,
            render: (row: any) => {
              const colorMap: Record<string, string> = {
                sold: "red",
                done: "green",
                booking: "yellow",
                progress: "blue", // 👈 tambahan status pembangunan
              };
              const color = colorMap[row.status] ?? "gray";
              const label = row.status?.charAt(0).toUpperCase() + row.status?.slice(1);
              return (
                <Badge color={color} variant="filled" radius="sm">
                  {label}
                </Badge>
              );
            },
          },
          {
            key: "aksi",
            title: "Aksi",
            width: 100,
            minWidth: 100,
            render: (row: any) => (
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
      />
      <EditCustomerModal initialData={useModalStore((state) => state.modalData)} />

      {totalPages > 0 && (
        <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {customerData?.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};

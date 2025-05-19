import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Badge } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import TableComponent from "@/components/common/table/TableComponent";
import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { useCookies } from "@/utils/hook/useCookies";

export const CustomerTable = () => {
  const { getToken } = useCookies();
  const token = getToken();

  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: customerData,
    isLoading,
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
  console.log("CUSTOMER LIST", customerList);

  const totalPages = useMemo(() => {
    return customerData?.total ? Math.ceil(customerData.total / limit) : 1;
  }, [customerData]);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, customerData?.total || 0);

  return (
    <Card shadow="sm" padding="lg">
      <LoadingGlobal visible={isLoading} />

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
          { key: "name", title: "Nama", width: 160, minWidth: 160 },
          { key: "address", title: "Alamat", width: 160, minWidth: 160 },
          { key: "phone", title: "Nomor Telepon", width: 100, minWidth: 100 },

          {
            key: "home.title",
            title: "Produk",
            width: 160,
            minWidth: 160,
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
        ]}
      />

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

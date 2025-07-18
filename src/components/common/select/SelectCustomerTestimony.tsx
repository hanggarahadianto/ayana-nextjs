import { getDataCustomer } from "@/api/customer/getDataCustomer";
import { capitalizeFirst } from "@/helper/capitalizeFirst";
import { Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

// Optional helper

// ⛳️ Tambahan agar `rawCustomer` dikenali di renderOption
declare module "@mantine/core" {
  interface ComboboxItem {
    rawCustomer?: {
      id: string;
      name: string;
      phone: string;
      status: string;
      home?: {
        title: string;
        type: string;
      } | null;
    };
  }
}

interface SelectCustomerTestimonyProps {
  companyId: string;
  value: string | null;
  onChange: (customerId: string | null) => void;
  label?: string;
  error?: string | null;
}

const SelectCustomerTestimony: React.FC<SelectCustomerTestimonyProps> = ({ companyId, value, onChange, label = "Customer", error }) => {
  const { data: customerData, isLoading } = useQuery({
    queryKey: ["getCustomerTestimony", companyId],
    queryFn: () =>
      getDataCustomer({
        companyId,
        statusCustomer: "handover",
        hasTestimony: false,
        limit: 1000,
      }),
    enabled: !!companyId,
  });

  const customerList = customerData?.data?.customerList ?? [];

  const options = customerList.map((customer) => ({
    value: customer.id,
    label: `${customer.name} - ${customer.home?.title ?? "Tanpa Rumah"} - ${customer.home?.type ?? "-"}`,
    rawCustomer: customer,
  }));

  return (
    <Select
      searchable
      clearable
      label={label}
      placeholder={isLoading ? "Memuat..." : `Pilih ${label}`}
      data={options}
      value={value}
      onChange={onChange}
      error={error}
      disabled={isLoading}
      styles={{
        input: { cursor: "pointer" },
        dropdown: { cursor: "pointer" },
        option: {
          fontSize: "14px",
          padding: "6px 10px",
        },
      }}
      renderOption={({ option }) => {
        const { rawCustomer } = option;
        if (!rawCustomer) return null;

        return (
          <Grid w="100%">
            <Grid.Col span={5}>
              <Text size="sm" fw={500}>
                {rawCustomer.name}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                {rawCustomer.home?.title ?? "-"}
              </Text>
            </Grid.Col>
            {/* <Grid.Col span={2}>
              <Text size="sm">{capitalizeFirst(rawCustomer.status)}</Text>
            </Grid.Col> */}
          </Grid>
        );
      }}
    />
  );
};

export default SelectCustomerTestimony;

import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getDataProduct } from "@/api/products/getDataProduct";

interface SelectProductProps {
  value?: string | null; // hanya id
  onChange: (value: string | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const SelectProduct = ({
  value,
  onChange,
  label = "Pilih Product",
  placeholder = "Pilih Salah Satu",
  required = false,
  error,
}: SelectProductProps) => {
  const status = "";
  const { data: productData, isPending } = useQuery({
    queryKey: ["getProductData"],
    queryFn: () => getDataProduct({ status, page: 1, limit: 100 }),
    refetchOnWindowFocus: false,
  });

  const options =
    productData?.data
      ?.map((product: any) => ({
        value: product.id,
        label: product.title || product.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  return (
    <Select
      error={error}
      w="100%"
      label={label}
      placeholder={placeholder}
      data={options}
      value={value ?? null}
      onChange={(val) => onChange(val)}
      required={required}
      searchable
      clearable
      nothingFoundMessage="Tidak Ada Produk"
      disabled={isPending}
      styles={{
        option: { fontSize: "14px", padding: "6px 10px" },
        input: { cursor: "pointer" },
      }}
    />
  );
};

export default SelectProduct;

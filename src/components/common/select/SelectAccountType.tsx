import { getDataAccount } from "@/api/account/getDataAccount";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ISelectFinanceAccountProps {
  companyId?: string;
  category?: string;
  category_only?: string;
  onSelect: (selected: { id: string; category: string; code?: string; type?: string; name?: string } | null) => void;
  label: string;
}

export default function SelectFinanceAccount({ companyId, category, category_only, onSelect, label }: ISelectFinanceAccountProps) {
  const { data: accountData, isLoading } = useQuery({
    queryKey: ["getAccountData", companyId, category, category_only],
    queryFn: () =>
      getDataAccount({
        companyId: companyId || "",
        category,
        category_only,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const accounts = useMemo(() => {
    return Array.isArray(accountData?.data) ? accountData.data : [];
  }, [accountData]);

  const handleSelect = (value: string | null) => {
    const selected = value ? accounts.find((acc) => acc.id === value) : null;

    if (selected) {
      if (category_only === "true") {
        onSelect({ id: selected.id, category: selected.category });
      } else {
        onSelect({
          id: selected.id,
          code: selected.code,
          type: selected.type,
          category: selected.category,
          name: selected.name,
        });
      }
    } else {
      onSelect(null);
    }
  };

  const accountOptions = useMemo(() => {
    if (category_only === "true") {
      return accounts.map((acc: any) => ({
        value: acc.id,
        label: acc.category,
      }));
    } else {
      return accounts.map((acc: any) => ({
        value: acc.id,
        label: `${acc.type} - ${acc.description}`,
      }));
    }
  }, [accounts, category_only]);

  return (
    <Select
      w={400}
      searchable
      clearable
      label={label}
      placeholder={`Pilih ${label ?? ""}`}
      onChange={handleSelect} // Handle change and reset to null
      data={accountOptions}
      disabled={isLoading}
      styles={{
        option: {
          fontSize: "14px",
          padding: "6px 10px",
        },
        input: {
          cursor: "pointer",
        },
      }}
    />
  );
}

import { getDataAccount } from "@/api/account/getDataAccount";
import { LoadingOverlay, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ISelectFinanceAccountProps {
  companyId?: string;
  category?: string;
  category_only?: string;
  all: boolean;
  onSelect: (selected: { id: string; category: string; code?: string; type?: string; name?: string } | null) => void;
  label: string;
  error: any;
  value?: string | null;
}

export default function SelectFinanceAccount({
  companyId,
  category,
  category_only,
  all,
  onSelect,
  label,
  error,
  value,
}: ISelectFinanceAccountProps) {
  const { data: accountData, isLoading } = useQuery({
    queryKey: ["getAccountData", companyId, category, category_only],
    queryFn: () =>
      getDataAccount({
        companyId: companyId || "",
        page: 3,
        limit: 10,
        category,
        category_only,
        all,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const accounts = useMemo(() => {
    return Array.isArray(accountData?.data) ? accountData.data : [];
  }, [accountData]);

  const handleSelect = (value: string | null) => {
    const selected = value ? accounts.find((acc: { id: string }) => acc.id === value) : null;

    if (selected) {
      if (category_only === "true") {
        onSelect({ id: selected.id, category: selected.category });
      } else {
        onSelect({
          id: selected.id,
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
    <>
      <LoadingOverlay visible={isLoading} />
      <Select
        value={value || null}
        error={error}
        w={400}
        searchable
        clearable
        label={label}
        placeholder={`Pilih ${label ?? ""}`}
        onChange={handleSelect}
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
    </>
  );
}

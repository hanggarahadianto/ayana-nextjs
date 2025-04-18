import { getDataAccount } from "@/api/account/getDataAccount";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface ISelectFinanceAccountProps {
  companyId: string;
  onSelect: (selected: { id: string; code: number; type: string }) => void;
}

export default function SelectFinanceAccount({ companyId, onSelect }: ISelectFinanceAccountProps) {
  //   console.log("company id", companyId);
  const { data: accountData, isLoading } = useQuery({
    queryKey: ["getAccountData", companyId],
    queryFn: () => getDataAccount(companyId, 1, 1000),
    refetchOnWindowFocus: false,
    enabled: !!companyId,
  });
  //   console.log("account data", accountData);

  //   const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
  //   console.log("selec", selectedAccount);

  // Memoized accounts data with sorting
  const accounts = useMemo(() => {
    return Array.isArray(accountData?.data)
      ? [...accountData.data].sort((a, b) => a.code - b.code) // sort descending by code
      : [];
  }, [accountData]);

  const handleSelect = (value: string | null) => {
    const account = value ? accounts.find((acc) => acc.id === value) : null;
    if (account) {
      onSelect({
        id: account.id,
        code: account.code,
        type: account.type,
      });
    }
  };

  // Create the options for the Select component
  const accountOptions = accounts.map((account) => ({
    value: account.id,
    label: `${account.type} - ${account.description}`,
  }));

  return (
    <>
      <Select
        searchable
        styles={{
          option: {
            fontSize: "14px",
            padding: "6px 10px",
          },
          input: {
            cursor: "pointer",
          },
        }}
        clearable
        label="Kategori"
        placeholder="Pilih Kategori"
        onChange={handleSelect}
        data={accountOptions}
      />
    </>
  );
}

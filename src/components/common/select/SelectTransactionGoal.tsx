"use client";

import { getDataAccount } from "@/api/account/getDataAccount";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface SelectTransactionGoalsProps {
  value: string;
  onChange: (value: string) => void;
}

export const SelectTransactionGoals: React.FC<SelectTransactionGoalsProps> = ({ value, onChange }) => {
  const options = [
    { value: "penjualan", label: "Penjualan" },
    { value: "pinjaman", label: "Pinjaman" },
  ];

  const handleSelect = (selectedValue: string | null) => {
    if (selectedValue) {
      onChange(selectedValue);
    }
  };

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
        w={400}
        label="Pilih Tujuan Transaksi"
        data={options}
        nothingFoundMessage="Tidak ditemukan"
        withCheckIcon={false}
        clearable
        // label={label}
        placeholder={"Pilih Tujuan Transaksi"}
        onChange={handleSelect}
        // data={accountOptions}
      />
    </>
  );
};

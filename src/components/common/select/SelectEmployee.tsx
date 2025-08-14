"use client";

import { getDataEmployee } from "@/api/employee/getDataEmployee";
import { Badge, Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IEmployeeOption {
  id: string;
  name: string;
  department?: string;
  is_agent?: boolean;
}

interface SelectEmployeeProps {
  companyId: string;
  value: string | null;
  isAgent: boolean;
  marketerName?: string;
  onChange: (value: string | null) => void;
  label?: string;
  error?: string | null;
}

const SelectEmployee: React.FC<SelectEmployeeProps> = ({
  companyId,
  value,
  isAgent,
  marketerName,
  onChange,
  label = "Pilih Karyawan",
  error,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getSelectEmployee", companyId, isAgent],
    queryFn: () =>
      getDataEmployee({
        companyId,
        isAgent,
        limit: 100,
      }),
    enabled: !!companyId,
  });

  const employeeList: IEmployeeOption[] = data?.data?.employeeList ?? [];

  // Placeholder jika marketerName ada
  const placeholderOption: { value: string; label: string; meta: IEmployeeOption }[] = marketerName
    ? [
        {
          value: value ?? "",
          label: marketerName,
          meta: {
            id: value ?? "",
            name: marketerName,
            is_agent: isAgent,
          },
        },
      ]
    : [];

  // Gabung placeholder + data asli
  const options: { value: string; label: string; meta: IEmployeeOption }[] = [
    ...placeholderOption,
    ...employeeList.map((employee) => ({
      value: employee.id,
      label: employee.name,
      meta: employee,
    })),
  ];

  const dynamicLabel = isAgent ? "Nama Agen" : label;

  return (
    <Select
      searchable
      clearable
      disabled={isLoading}
      label={dynamicLabel}
      placeholder={isLoading ? "Memuat..." : marketerName ?? dynamicLabel}
      data={options}
      value={value}
      onChange={onChange}
      error={error}
      styles={{
        option: { fontSize: 14, padding: "6px 10px" },
        input: { cursor: "pointer" },
        dropdown: { cursor: "pointer" },
      }}
      renderOption={({ option }) => {
        const { name, department, is_agent } = (option as (typeof options)[number]).meta;

        return (
          <Grid w="100%" align="center">
            <Grid.Col span={6}>
              <Text size="sm" fw={500}>
                {name}
              </Text>
            </Grid.Col>
            <Grid.Col span={3}>
              {department ? (
                <Badge color="green" size="sm">
                  {department}
                </Badge>
              ) : (
                <Badge color="gray" variant="light" size="sm">
                  -
                </Badge>
              )}
            </Grid.Col>
            <Grid.Col span={3}>
              <Badge color={is_agent ? "teal" : "blue"} size="sm" variant="light">
                {is_agent ? "Agen" : "Karyawan"}
              </Badge>
            </Grid.Col>
          </Grid>
        );
      }}
    />
  );
};

export default SelectEmployee;

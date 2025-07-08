"use client";

import { getDataEmployee } from "@/api/employee/getDataEmployee";
import { Badge, Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// Custom field to store raw data
declare module "@mantine/core" {
  interface ComboboxItemEmployee {
    raw?: IEmployeeOption;
  }
}

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

  const employeeList = data?.data?.employeeList ?? [];

  const placeholderOption = marketerName
    ? [
        {
          value: value ?? "",
          label: marketerName,
          raw: {
            id: value ?? "",
            name: marketerName,
            is_agent: isAgent,
          },
        },
      ]
    : [];

  const options = [
    ...placeholderOption,
    ...employeeList.map((employee): any => ({
      value: employee.id,
      label: employee.name,
      raw: employee,
    })),
  ];

  const dynamicLabel = isAgent ? "Nama Agen" : label;
  // console.log("marketer name", marketerName);

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
        const employee = option.raw as IEmployeeOption;
        if (!employee) return null;

        return (
          <Grid w="100%" align="center">
            <Grid.Col span={6}>
              <Text size="sm" fw={500}>
                {employee.name}
              </Text>
            </Grid.Col>
            <Grid.Col span={3}>
              {!employee.is_agent && employee.department && (
                <Badge color="green" size="sm">
                  {employee.department}
                </Badge>
              )}
            </Grid.Col>
            <Grid.Col span={3}>
              <Badge color={employee.is_agent ? "teal" : "blue"} size="sm">
                {employee.is_agent ? "Agen" : "Karyawan"}
              </Badge>
            </Grid.Col>
          </Grid>
        );
      }}
    />
  );
};

export default SelectEmployee;

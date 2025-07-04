import { getDataEmployee } from "@/api/employee/getDataEmployee";
import { Badge, Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// Tambahkan raw field ke ComboboxItem agar bisa dipakai di renderOption
declare module "@mantine/core" {
  interface ComboboxItem {
    raw?: {
      id: string;
      name: string;
      department?: string;
    };
  }
}

interface IEmployeeOption {
  id: string;
  name: string;
  department?: string;
}

interface SelectEmployeeProps {
  companyId: string;
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
  error?: string | null;
}

const SelectEmployee: React.FC<SelectEmployeeProps> = ({ companyId, value, onChange, label = "Pilih Karyawan", error }) => {
  const { data: employeeData, isLoading } = useQuery({
    queryKey: ["getSelectEmployee", companyId],
    queryFn: () =>
      getDataEmployee({
        companyId,
      }),
    enabled: !!companyId,
  });

  const employeeList: IEmployeeOption[] = employeeData?.data?.employeeList ?? [];

  const options = employeeList.map((employee) => ({
    value: employee.id,
    label: employee.name,
    raw: employee, // untuk renderOption
  }));

  return (
    <Select
      searchable
      clearable
      disabled={isLoading}
      label={label}
      placeholder={isLoading ? "Memuat..." : "Pilih Karyawan"}
      data={options}
      value={value}
      onChange={onChange}
      error={error}
      styles={{
        option: {
          fontSize: "14px",
          padding: "6px 10px",
        },
        input: {
          cursor: "pointer",
        },
        dropdown: {
          cursor: "pointer",
        },
      }}
      renderOption={({ option }) => {
        const { name, department } = option.raw || {};
        return (
          <Grid w={"100%"} align="center">
            <Grid.Col span={8}>
              <Text size="sm" fw={500}>
                {name}
              </Text>
            </Grid.Col>
            <Grid.Col span={4}>
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
          </Grid>
        );
      }}
    />
  );
};

export default SelectEmployee;

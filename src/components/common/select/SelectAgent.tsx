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
      is_agent?: boolean;
    };
  }
}

interface IAgentOption {
  id: string;
  name: string;
  department?: string;
  is_agent?: boolean;
}

interface SelectAgentProps {
  companyId: string;
  value: string | null;
  isAgent: boolean;
  onChange: (value: string | null) => void;
  label?: string;
  error?: string | null;
}

const SelectAgent: React.FC<SelectAgentProps> = ({ companyId, value, isAgent, onChange, label = "Pilih Agent", error }) => {
  const { data: agentData, isLoading } = useQuery({
    queryKey: ["getSelectAgent", companyId],
    queryFn: () =>
      getDataEmployee({
        companyId,
        isAgent,
      }),
    enabled: !!companyId,
  });

  const agentList: IAgentOption[] = agentData?.data?.employeeList ?? [];

  const options = agentList.map((agent) => ({
    value: agent.id,
    label: agent.name,
    raw: agent, // untuk renderOption
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
        const { name, department, is_agent } = option.raw || {};

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
              {is_agent === false && (
                <Badge color="blue" size="sm" variant="light">
                  Karyawan
                </Badge>
              )}
            </Grid.Col>
          </Grid>
        );
      }}
    />
  );
};

export default SelectAgent;

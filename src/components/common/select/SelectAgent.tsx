import { getDataEmployee } from "@/api/employee/getDataEmployee";
import { Badge, Grid, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

  // Pakai 'meta' biar nggak bentrok sama raw di global type
  const options = agentList.map((agent) => ({
    value: agent.id,
    label: agent.name,
    meta: agent,
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

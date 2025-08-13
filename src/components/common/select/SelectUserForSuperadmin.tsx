import { getUserByIdForSuperadmin } from "@/api/user/getUserDataForSuperadmin";
import { Grid, MultiSelect, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

declare module "@mantine/core" {
  interface ComboboxItem {
    raw?: IUserOption;
  }
}

interface IUserOption {
  id: string;
  username: string;
  role?: string;
}

interface SelectUserProps {
  userId: string;
  value: string[]; // ⬅️ array
  isuser: boolean;
  onChange: (value: string[]) => void; // ⬅️ array
  label?: string;
  error?: string | null;
}

const SelectUser: React.FC<SelectUserProps> = ({ userId, value, isuser, onChange, label = "Pilih Pengguna", error }) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["getSelectUser", userId],
    queryFn: () => getUserByIdForSuperadmin({ id: userId }),
    enabled: !!userId,
  });

  const userList: IUserOption[] = userData?.data?.userList ?? [];

  const options = userList
    .filter((user) => user.username.toLowerCase() !== "superadmin") // ⬅️ sembunyikan superadmin
    .map((user) => ({
      value: user.id,
      label: user.username.charAt(0).toUpperCase() + user.username.slice(1),
      raw: user,
    }));

  return (
    <MultiSelect
      //   searchable
      clearable
      disabled={isLoading}
      label={label}
      placeholder={isLoading ? "Memuat..." : "Pilih Pengguna"}
      data={options}
      value={value}
      onChange={onChange}
      error={error}
      styles={{
        root: { cursor: "pointer" },
        input: { cursor: "pointer" }, // override input default yang `text`
        option: { fontSize: "14px", padding: "6px 10px", cursor: "pointer" },
      }}
      renderOption={({ option }) => {
        const raw = option.raw;
        if (!raw) return null;

        return (
          <Grid w="100%">
            <Grid.Col span={6}>
              <Text size="sm" fw={500}>
                {raw.username}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                {raw.role || "-"}
              </Text>
            </Grid.Col>
          </Grid>
        );
      }}
    />
  );
};

export default SelectUser;

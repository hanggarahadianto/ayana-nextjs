import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { Group } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { ReactNode } from "react";
interface Column<T> {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  render?: (item: T) => ReactNode;
}

export const columnsBaseUser = (
  openEditModal: (row: IUserUpdate) => void,
  handleDeleteDataCompanyById: (id: string) => void,
  isLoading: boolean
): Column<IUserUpdate>[] => [
  { key: "username", title: "Nama Pengguna", width: 40, minWidth: 40 },
  { key: "role", title: "Role", width: 120, minWidth: 120 },
  {
    key: "aksi",
    title: "Aksi",
    width: 80,
    minWidth: 80,
    render: (row) => (
      <Group gap="lg">
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size={"2.2rem"} />
        <ButtonDeleteWithConfirmation
          isLoading={isLoading}
          onDelete={() => handleDeleteDataCompanyById(row.id)}
          description={`Hapus akun ${row.username}?`}
          size={2.2}
        />
      </Group>
    ),
  },
];

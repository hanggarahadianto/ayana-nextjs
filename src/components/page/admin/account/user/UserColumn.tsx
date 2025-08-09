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
  openEditModal: (row: IUserItem) => void,
  handleDeleteDataCompanyById: (id: string) => void
): Column<IUserItem>[] => [
  { key: "username", title: "Nama Pengguna", width: 40, minWidth: 40 },
  { key: "role", title: "Role", width: 200, minWidth: 200 },
  {
    key: "aksi",
    title: "Aksi",
    width: 100,
    minWidth: 100,
    render: (row) => (
      <Group gap="lg">
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size={"2.2rem"} />
        <ButtonDeleteWithConfirmation
          isLoading={false}
          onDelete={() => handleDeleteDataCompanyById(row.id)}
          description={`Hapus perusahaan ${row.username}?`}
          size={2.2}
        />
      </Group>
    ),
  },
];

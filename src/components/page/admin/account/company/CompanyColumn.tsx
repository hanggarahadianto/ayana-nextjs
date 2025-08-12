import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { IconPencil, IconPlayerSkipForwardFilled } from "@tabler/icons-react";
import { MdEmojiPeople } from "react-icons/md";
import { ReactNode } from "react";
interface Column<T> {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  render?: (item: T) => ReactNode;
}

export const columnsBaseCompany = (
  openEditModal: (row: ICompanyItem) => void,
  openAssignModal: (row: any) => void,
  handleDeleteDataCompanyById: (id: string) => void,
  isLoading: boolean
): Column<ICompanyItem>[] => [
  { key: "company_code", title: "Kode Perusahaan", width: 40, minWidth: 40 },
  { key: "title", title: "Nama Perusahaan", width: 100, minWidth: 100 },
  {
    key: "is_retail",
    title: "Retail",
    width: 40,
    minWidth: 40,
    render: (item) => (item.is_retail ? "Ya" : "Tidak"),
  },
  {
    key: "has_project",
    title: "Project",
    width: 40,
    minWidth: 40,
    render: (item) => (item.has_project ? "Ya" : "Tidak"),
  },
  {
    key: "has_customer",
    title: "Customer",
    width: 40,
    minWidth: 40,
    render: (item) => (item.has_customer ? "Ya" : "Tidak"),
  },
  {
    key: "users",
    title: "Pengguna",
    width: 150,
    minWidth: 150,
    render: (item) => (
      <Stack gap={4}>
        {item.users?.map((user) => (
          <Group gap={6} key={user.id}>
            <Badge variant="light" color="blue" size="sm">
              {user.username}
            </Badge>
            <Text size="xs" c="dimmed">
              ({user.role})
            </Text>
          </Group>
        ))}
      </Stack>
    ),
  },
  {
    key: "aksi",
    title: "Aksi",
    width: 80,
    minWidth: 80,
    render: (row) => (
      <Group gap="lg">
        <BreathingActionIcon
          onClick={() => openAssignModal(row.id)}
          icon={<MdEmojiPeople size="1rem" />}
          size={"2.2rem"}
          backgroundColor="#5DADE2"
        />

        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size={"2.2rem"} />
        <ButtonDeleteWithConfirmation
          isLoading={isLoading}
          onDelete={() => handleDeleteDataCompanyById(row.id)}
          description={`Hapus perusahaan ${row.title}?`}
          size={2.2}
        />
      </Group>
    ),
  },
];

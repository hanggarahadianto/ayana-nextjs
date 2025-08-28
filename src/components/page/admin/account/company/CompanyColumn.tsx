import BreathingActionIcon from "@/components/common/button/buttonAction";
import { Badge, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { MdEmojiPeople } from "react-icons/md";
import { ReactNode } from "react";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";

interface Column<T> {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  render?: (item: T) => ReactNode;
}

const renderSuperadminAction = (
  user: IUser | null,
  onClick: () => void,
  icon: ReactNode,
  size = "2.2rem",
  activeColor = "#5DADE2",
  disabledColor = "#AAB7B8"
) => {
  const isSuperAdmin = user?.username === "superadmin";

  return isSuperAdmin ? (
    <BreathingActionIcon onClick={onClick} icon={icon} size={size} backgroundColor={activeColor} />
  ) : (
    <Tooltip label="superadmin only" withArrow position="top">
      <span style={{ display: "inline-flex" }}>
        <BreathingActionIcon onClick={(e) => e.preventDefault()} icon={icon} size={size} backgroundColor={disabledColor} disabled />
      </span>
    </Tooltip>
  );
};

export const columnsBaseCompany = (
  user: IUser | null,
  openEditModal: (row: ICompanyItem) => void,
  openAssignModal: (row: ICompanyItem) => void,
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
        {/* Assign User - superadmin only */}
        {renderSuperadminAction(user, () => openAssignModal(row), <MdEmojiPeople size="1rem" />)}

        {/* Edit - selalu aktif */}
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size="2.2rem" />

        {/* Delete - selalu aktif */}
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

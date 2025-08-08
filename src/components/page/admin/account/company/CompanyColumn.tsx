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

export const columnsBaseCompany = (
  openEditModal: (row: ICompanyItem) => void,
  handleDeleteDataCompanyById: (id: string) => void
): Column<ICompanyItem>[] => [
  { key: "company_code", title: "Kode Perusahaan", width: 40, minWidth: 40 },
  { key: "title", title: "Nama Perusahaan", width: 200, minWidth: 200 },
  {
    key: "is_retail",
    title: "Retail",
    width: 160,
    minWidth: 160,
    render: (item) => (item.is_retail ? "Ya" : "Tidak"),
  },
  {
    key: "has_project",
    title: "Project",
    width: 160,
    minWidth: 160,
    render: (item) => (item.has_project ? "Ya" : "Tidak"),
  },
  {
    key: "has_customer",
    title: "Customer",
    width: 160,
    minWidth: 160,
    render: (item) => (item.has_customer ? "Ya" : "Tidak"),
  },
  {
    key: "aksi",
    title: "Aksi",
    width: 100,
    minWidth: 100,
    render: (row) => (
      <Group gap="lg">
        {/* <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size={"2.2rem"} /> */}
        <ButtonDeleteWithConfirmation
          isLoading={false}
          onDelete={() => handleDeleteDataCompanyById(row.id)}
          description={`Hapus perusahaan ${row.title}?`}
          size={2.2}
        />
      </Group>
    ),
  },
];

import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Badge, Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseEmployee = (openEditModal: (item: IEmployeeItem) => void, handleDeleteEmployee: (id: string) => void) => [
  { key: "name", title: "Nama", width: 180, minWidth: 180 },
  { key: "address", title: "Alamat", width: 280, minWidth: 280 },
  { key: "phone", title: "No. Telepon", width: 110, minWidth: 110 },

  { key: "gender", title: "Jenis Kelamin", width: 100, minWidth: 100 },
  {
    key: "date_birth",
    title: "Tanggal Lahir",
    width: 130,
    minWidth: 130,
    render: (item: IEmployeeItem) => (item.date_birth ? formatDateIndonesia(item.date_birth) : "-"),
  },
  { key: "religion", title: "Agama", width: 90, minWidth: 90 },
  {
    key: "marital_status",
    title: "Status Pernikahan",
    width: 130,
    minWidth: 130,
    render: (item: IEmployeeItem) => item.marital_status || "-",
  },
  {
    key: "employee_education",
    title: "Pendidikan Terakhir",
    width: 150,
    minWidth: 150,
    render: (item: IEmployeeItem) => item.employee_education || "-",
  },
  { key: "department", title: "Departemen", width: 90, minWidth: 90 },
  { key: "position", title: "Jabatan", width: 90, minWidth: 90 },
  {
    key: "employee_contract_type",
    title: "Tipe Kontrak",
    width: 100,
    minWidth: 100,
    render: (item: IEmployeeItem) => item.employee_contract_type || "-",
  },
  {
    key: "employee_status",
    title: "Status",
    width: 80,
    minWidth: 80,
    render: (record: any) => {
      const status = record.employee_status;

      const statusColorMap: Record<string, { color: string; label: string }> = {
        Aktif: { color: "green", label: "Aktif" },
        Cuti: { color: "yellow", label: "Cuti" },
        Resign: { color: "gray", label: "Resign" },
        Diberhentikan: { color: "red", label: "Diberhentikan" },
        Pensiun: { color: "grape", label: "Pensiun" },
      };

      const badge = statusColorMap[status] || { color: "gray", label: status };

      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Badge color={badge.color}>{badge.label}</Badge>
        </div>
      );
    },
  },

  {
    key: "aksi",
    title: "Aksi",
    width: 80,
    minWidth: 80,
    render: (item: IEmployeeItem) => (
      <Flex gap="lg" justify="center">
        <BreathingActionIcon onClick={() => openEditModal(item)} icon={<IconPencil size="2rem" />} size="2.2rem" />
        <ButtonDeleteWithConfirmation
          isLoading={false}
          // id={item.id}
          onDelete={() => handleDeleteEmployee(item.id)}
          description={`Hapus karyawan bernama ${item.name}?`}
          size={2.2}
        />
      </Flex>
    ),
  },
];

import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseEmployee = (openEditModal: (item: IEmployeeItem) => void, handleDeleteEmployee: (id: string) => void) => [
  { key: "name", title: "Nama", width: 180, minWidth: 180 },
  { key: "gender", title: "Jenis Kelamin", width: 100, minWidth: 100 },
  {
    key: "date_birth",
    title: "Tanggal Lahir",
    width: 130,
    minWidth: 130,
    render: (item: IEmployeeItem) => (item.date_birth ? formatDateIndonesia(item.date_birth) : "-"),
  },
  { key: "phone", title: "No. Telepon", width: 130, minWidth: 130 },
  { key: "address", title: "Alamat", width: 200, minWidth: 200 },
  { key: "religion", title: "Agama", width: 100, minWidth: 100 },
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
  { key: "department", title: "Departemen", width: 140, minWidth: 140 },
  { key: "position", title: "Jabatan", width: 140, minWidth: 140 },
  {
    key: "employee_contract_type",
    title: "Tipe Kontrak",
    width: 130,
    minWidth: 130,
    render: (item: IEmployeeItem) => item.employee_contract_type || "-",
  },
  { key: "employee_status", title: "Status Karyawan", width: 120, minWidth: 120 },

  {
    key: "aksi",
    title: "Aksi",
    width: 80,
    minWidth: 80,
    render: (item: IEmployeeItem) => (
      <Flex gap="lg" justify="center">
        <BreathingActionIcon onClick={() => openEditModal(item)} icon={<IconPencil size="2rem" />} size="2.2rem" />
        <ButtonDeleteWithConfirmation
          id={item.id}
          onDelete={() => handleDeleteEmployee(item.id)}
          description={`Hapus karyawan bernama ${item.name}?`}
          size={2.2}
        />
      </Flex>
    ),
  },
];

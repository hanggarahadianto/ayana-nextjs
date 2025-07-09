import { Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const columnsBasePresence = (openEditModal: (item: IPresenceItem) => void, handleDeletePresence: (id: string) => void) => [
  {
    key: "scan_date",
    title: "Tanggal",
    width: 120,
    minWidth: 120,
    render: (record: any) => format(new Date(record.scan_date), "dd MMMM yyyy", { locale: id }),
  },
  {
    key: "scan_time",
    title: "Jam",
    width: 100,
    minWidth: 100,
    render: (record: IPresenceItem) => record.scan_time,
  },
  {
    key: "raw_date",
    title: "Tanggal Excel",
    width: 130,
    minWidth: 130,
    render: (record: IPresenceItem) => record.raw_date,
  },
  {
    key: "employee_name",
    title: "Nama Karyawan",
    width: 130,
    minWidth: 130,
    render: (record: IPresenceItem) => record.Employee.name,
  },
  {
    key: "department",
    title: "Nama Departemen",
    width: 130,
    minWidth: 130,
    render: (record: IPresenceItem) => record.Employee.department,
  },
  {
    key: "aksi",
    title: "Aksi",
    width: 80,
    minWidth: 80,
    render: (item: IPresenceItem) => (
      <Flex gap="lg" justify="center">
        <BreathingActionIcon onClick={() => openEditModal(item)} icon={<IconPencil size="2rem" />} size="2.2rem" />
        <ButtonDeleteWithConfirmation
          id={item.id}
          onDelete={() => handleDeletePresence(item.id)}
          description={`Hapus data presensi dengan ID ${item.id}?`}
          size={2.2}
        />
      </Flex>
    ),
  },
];

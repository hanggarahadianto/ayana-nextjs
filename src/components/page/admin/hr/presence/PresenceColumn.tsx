import { Badge, Checkbox, Flex, Stack } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { UseListStateHandlers } from "@mantine/hooks";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { getPresenceStatus } from "@/helper/presenceStatus";

type CheckboxItem = { id: string; checked: boolean; key: string };

export const columnsBasePresence = (
  openEditModal: (item: IPresenceItem) => void,
  handleDeletePresence: (id: string) => void,
  checkboxStates: CheckboxItem[],
  checkboxHandlers: UseListStateHandlers<CheckboxItem>,
  presenceRuleList: IPresenceRuleItem[]
) => [
  {
    key: "checkbox",
    title: "",
    width: 1,
    minWidth: 1,
    render: (item: IPresenceItem) => {
      const index = checkboxStates.findIndex((i) => i.id === item.id);
      if (index === -1) return <Checkbox disabled />;
      return (
        <Stack justify="justify-center" align="center">
          <Checkbox
            key={checkboxStates[index].key}
            checked={checkboxStates[index].checked}
            onChange={(e) => checkboxHandlers.setItemProp(index, "checked", e.currentTarget.checked)}
          />
        </Stack>
      );
    },
  },
  {
    key: "scan_date",
    title: "Tanggal",
    width: 120,
    minWidth: 120,
    render: (record: any) => formatDateIndonesia(new Date(record.scan_date)),
  },
  {
    key: "scan_time",
    title: "Jam",
    width: 100,
    minWidth: 100,
    render: (record: IPresenceItem) => record.scan_time,
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
    key: "status",
    title: "Status",
    width: 130,
    minWidth: 130,
    render: (record: IPresenceItem) => {
      const [hour] = record.scan_time.split(":").map(Number);
      const scanType = hour < 12 ? "arrival" : "departure";

      const status = getPresenceStatus(record.scan_date, record.scan_time, presenceRuleList, scanType);

      const labelMap: Record<typeof status, string> = {
        green: scanType === "arrival" ? "Tepat Waktu" : "Pulang Tepat Waktu",
        teal: scanType === "arrival" ? "Terlambat Level 1" : "Pulang Cepat Level 1",
        yellow: scanType === "arrival" ? "Terlambat Level 2" : "Pulang Cepat Level 2",
        red: scanType === "arrival" ? "Terlambat Level 3" : "Pulang Cepat Level 3",
        gray: scanType === "arrival" ? "Terlambat Parah / Libur" : "Pulang Parah / Libur",
      };

      return <Badge color={status}>{labelMap[status]}</Badge>;
    },
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

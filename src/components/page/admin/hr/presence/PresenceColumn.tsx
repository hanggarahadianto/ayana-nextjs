import { Badge, Checkbox, Stack } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { getPresenceStatus } from "@/helper/presenceStatus";
import { dayDictionary } from "@/constants/dictionary";

type CheckboxItem = { id: string; checked: boolean; key: string };

export const columnsBasePresence = (
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
    key: "day",
    title: "Hari",
    width: 60,
    minWidth: 60,
    render: (record: IPresenceItem) => {
      const found = dayDictionary.find((d) => d.value === record.day?.toLowerCase());
      return found ? found.label : "-";
    },
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

      const status = getPresenceStatus(record.scan_date, record.scan_time, presenceRuleList, scanType, record.day);

      const labelMap: Record<typeof status, string> = {
        green: scanType === "arrival" ? "✅ Hadir Tepat Waktu" : "✅ Pulang Tepat Waktu",
        teal: scanType === "arrival" ? "🟡 Terlambat Sedikit" : "🟡 Pulang Lebih Awal (Ringan)",
        yellow: scanType === "arrival" ? "🟠 Terlambat" : "🟠 Pulang Lebih Awal",
        red: scanType === "arrival" ? "🔴 Terlambat Parah" : "🔴 Pulang Terlalu Cepat",
        gray: scanType === "arrival" ? "❌ Tidak Hadir / Izin" : "❌ Tidak Ada Data Pulang",
      };

      return (
        <Stack p={4}>
          <Badge color={status}>{labelMap[status]}</Badge>
        </Stack>
      );
    },
  },
];

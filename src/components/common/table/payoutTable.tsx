import { Group, ScrollArea, Table as MantineTable, ThemeIcon } from "@mantine/core";
import ButtonDeleteWithConfirmation from "../button/buttonDeleteConfirmation";
import EditPayoutModal from "@/components/page/admin/payout/EditPayoutModal";

// Import komponen aksi (pastikan tersedia)

// Struktur data minimal yang dibutuhkan tabel
interface Item {
  id: string;
  invoice: string;
  nominal: number;
  due_date: string | Date;
  status: string;
  [key: string]: any;
}

// Interface untuk props generik
interface TableProps<T extends Item> {
  data?: T[];
  onRowClick?: (item: T) => void;
  onDelete?: (id: string) => void;
  refetchData?: () => void;
}

// Komponen Table generik
export default function Table<T extends Item>({ data = [], onRowClick, onDelete, refetchData }: TableProps<T>) {
  return (
    <ScrollArea>
      <MantineTable
        highlightOnHover
        withColumnBorders
        style={{
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        <MantineTable.Thead>
          <MantineTable.Tr>
            <MantineTable.Th style={{ textAlign: "center", width: "150px" }}>Invoice</MantineTable.Th>
            <MantineTable.Th style={{ textAlign: "center", width: "120px" }}>Nominal</MantineTable.Th>
            <MantineTable.Th style={{ textAlign: "center", width: "160px" }}>Jatuh Tempo</MantineTable.Th>
            <MantineTable.Th style={{ textAlign: "center", width: "60px" }}>Status</MantineTable.Th>
            <MantineTable.Th style={{ textAlign: "center", width: "120px" }}>Aksi</MantineTable.Th>
          </MantineTable.Tr>
        </MantineTable.Thead>

        <MantineTable.Tbody>
          {data.map((item) => (
            <MantineTable.Tr key={item.id} onClick={() => onRowClick?.(item)} style={{ cursor: onRowClick ? "pointer" : "default" }}>
              <MantineTable.Td>{item.invoice}</MantineTable.Td>

              <MantineTable.Td>
                {item.nominal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 2,
                })}
              </MantineTable.Td>

              <MantineTable.Td>
                {new Intl.DateTimeFormat("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(item.due_date))}
              </MantineTable.Td>

              <MantineTable.Td>
                <Group gap="xs" justify="center">
                  <ThemeIcon size="sm" radius="xl" color={item.status === "tempo" ? "red" : "green"} />
                </Group>
              </MantineTable.Td>

              <MantineTable.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  {/* <PayPayoutButton payout={item} refetchPayoutData={refetchData} />
                  <EditPayoutModal payout={item} refetchPayoutData={refetchData} /> */}
                  {onDelete && (
                    <ButtonDeleteWithConfirmation
                      id={item.id}
                      onDelete={onDelete}
                      description={`Apakah Anda yakin ingin menghapus invoice ${item.invoice}?`}
                      size={2}
                    />
                  )}
                </Group>
              </MantineTable.Td>
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
    </ScrollArea>
  );
}

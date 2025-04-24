import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { formatDaysToMonths } from "@/utils/formatDaysToMonth";
import { Group, ScrollArea, Table, ThemeIcon, Text, Card, Badge } from "@mantine/core";
import { differenceInDays, format } from "date-fns";

interface OutstandingDebtTableProps {
  data: IDebtSummaryItem[];
  startIndex?: number;
}

const calculateDaysLeft = (dueDate: string) => {
  const due = new Date(dueDate);
  const today = new Date();
  return differenceInDays(due, today);
};

export default function OutstandingDebtTable({ data, startIndex = 1 }: OutstandingDebtTableProps) {
  // console.log("data OutstandingDebt table", data);

  return (
    <ScrollArea style={{ minHeight: 400 }} p={"xl"}>
      <Table
        // Menggunakan token ukuran Mantine (xs, sm, md, lg, xl)
        highlightOnHover
        withColumnBorders
        style={{
          tableLayout: "fixed",
          width: "100%",
          minWidth: 700,
          maxWidth: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center", width: 80, minWidth: 80 }}>No</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 180, minWidth: 180 }}>Invoice</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 300, minWidth: 300 }}>Partner</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 160, minWidth: 160 }}>Amount</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Tanggal Masuk</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Tanggal Jatuh Tempo</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Status</Table.Th>

            <Table.Th style={{ textAlign: "center", width: 600, minWidth: 600 }}>Deskripsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((OutstandingDebt: IDebtSummaryItem, index: number) => {
            const daysLeft = OutstandingDebt.due_date ? calculateDaysLeft(OutstandingDebt.due_date) : 0;
            const statusText = formatDaysToMonths(daysLeft);

            // Modifikasi logika statusColor
            const statusColor = daysLeft < 0 ? "red" : daysLeft <= 15 ? "orange" : "green";
            return (
              <Table.Tr
                key={OutstandingDebt.id}
                // onClick={() => onRowClick(OutstandingDebt)}
                style={{ cursor: "pointer" }}
              >
                <Table.Td>{startIndex + index}</Table.Td>

                <Table.Td>{OutstandingDebt.invoice}</Table.Td>
                <Table.Td>{OutstandingDebt.partner}</Table.Td>

                <Table.Td>{formatCurrency(OutstandingDebt.amount)}</Table.Td>
                {/* <Table.Td>{OutstandingDebt.type}</Table.Td> */}
                {/* <Table.Td>{OutstandingDebt.category}</Table.Td> */}
                <Table.Td>{OutstandingDebt.date_inputed ? formatDateIndonesia(OutstandingDebt.date_inputed) : "-"}</Table.Td>
                <Table.Td>{OutstandingDebt.due_date ? formatDateIndonesia(OutstandingDebt.due_date) : "-"}</Table.Td>
                {/* <Table.Td>{OutstandingDebt.status}</Table.Td> */}
                <Table.Td>
                  <Badge color={statusColor} variant="light">
                    {statusText}
                  </Badge>
                  {/* </Group> */}
                </Table.Td>
                {/* <Table.Td>{dueDateFormatted}</Table.Td> */}

                <Table.Td>{OutstandingDebt.description}</Table.Td>
                {/* <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PayOutstandingDebtButton OutstandingDebt={OutstandingDebt} refetchOutstandingDebtData={refetchOutstandingDebtData} />
                  <EditOutstandingDebtModal OutstandingDebt={OutstandingDebt} refetchOutstandingDebtData={refetchOutstandingDebtData} />
                  <ButtonDeleteWithConfirmation
                    id={OutstandingDebt.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${OutstandingDebt.invoice}?`}
                    size={2}
                  />
                </Group>
              </Table.Td> */}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

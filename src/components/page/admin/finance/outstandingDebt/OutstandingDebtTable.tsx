import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { formatDaysToMonths } from "@/utils/formatDaysToMonth";
import { Group, ScrollArea, Table, ThemeIcon, Text, Card, Badge } from "@mantine/core";
import { differenceInDays, format } from "date-fns";
import { IoIosSend } from "react-icons/io";
import ReversedJournalEntryModal from "../journalEntry/ReversedJournalEntryModal";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

interface OutstandingDebtTableProps {
  data: IDebtSummaryItem[];
  startIndex?: number;
  companyId?: string;
}

const calculateDaysLeft = (dueDate: string) => {
  const due = new Date(dueDate);
  const today = new Date();
  return differenceInDays(due, today);
};

export default function OutstandingDebtTable({ data, startIndex = 1, companyId }: OutstandingDebtTableProps) {
  const [selectedDebt, setSelectedDebt] = useState<IDebtSummaryItem | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false); // Use useDisclosure here

  const handleSendClick = (debt: IDebtSummaryItem) => {
    setSelectedDebt(debt);
    open(); // Open modal when a debt is selected
  };

  return (
    <>
      <ScrollArea style={{ minHeight: 400 }} p={"xl"}>
        <Table
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
              <Table.Th style={{ textAlign: "center", width: 280, minWidth: 280 }}>Partner</Table.Th>
              <Table.Th style={{ textAlign: "center", width: 170, minWidth: 170 }}>Amount</Table.Th>
              <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Tanggal Masuk</Table.Th>
              <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Tanggal Jatuh Tempo</Table.Th>
              <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Status</Table.Th>
              <Table.Th style={{ textAlign: "center", width: 60, minWidth: 60 }}>Action</Table.Th>

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
                <Table.Tr key={OutstandingDebt.id} style={{ cursor: "pointer" }}>
                  <Table.Td>{startIndex + index}</Table.Td>

                  <Table.Td>{OutstandingDebt.invoice}</Table.Td>
                  <Table.Td>{OutstandingDebt.partner}</Table.Td>

                  <Table.Td>{formatCurrency(OutstandingDebt.amount)}</Table.Td>
                  <Table.Td>{OutstandingDebt.date_inputed ? formatDateIndonesia(OutstandingDebt.date_inputed) : "-"}</Table.Td>
                  <Table.Td>{OutstandingDebt.due_date ? formatDateIndonesia(OutstandingDebt.due_date) : "-"}</Table.Td>
                  <Table.Td>
                    <Badge color={statusColor} variant="light">
                      {statusText}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <IoIosSend
                      color="green"
                      size={"22px"}
                      onClick={() => handleSendClick(OutstandingDebt)} // 3. Add onClick handler
                    />
                  </Table.Td>

                  <Table.Td>{OutstandingDebt.description}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      {/* Modal akan muncul ketika modalOpen bernilai true */}
      {companyId && (
        <ReversedJournalEntryModal
          companyId={companyId}
          transactionType="payout" // or "payout" depending on your use case
          selectedDebt={selectedDebt} // Pass selectedDebt as prop
          opened={opened} // Pass opened state here
          close={close} // Pass close function here
        />
      )}
    </>
  );
}

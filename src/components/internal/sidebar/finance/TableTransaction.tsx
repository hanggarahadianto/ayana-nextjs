import { Group, ScrollArea, Table, ThemeIcon } from "@mantine/core";
import EditPayoutModal from "@/components/internal/sidebar/finance/payout/EditPayoutModal";
import PayPayoutButton from "@/components/internal/sidebar/finance/payout/EditStatusPayout";
import ButtonDeleteWithConfirmation from "@/lib/button/buttonDeleteConfirmation";

interface TableTransactionProps {
  data: IPayoutUpdate[];
  onRowClick: (payout: IPayoutUpdate) => void;
  onDelete: (id: string) => void;
  refetchPayoutData: () => void;
}

export default function TableTransaction({ data, onRowClick, onDelete, refetchPayoutData }: TableTransactionProps) {
  return (
    <ScrollArea>
      <Table
        highlightOnHover
        withColumnBorders
        style={{
          tableLayout: "fixed", // ⛔ penting untuk ukuran kolom tetap
          width: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center", width: "150px" }}>Invoice</Table.Th>
            <Table.Th style={{ textAlign: "center", width: "120px" }}>Nominal</Table.Th>
            <Table.Th style={{ textAlign: "center", width: "160px" }}>Jatuh Tempo</Table.Th>
            <Table.Th style={{ textAlign: "center", width: "60px" }}>Status</Table.Th>
            <Table.Th style={{ textAlign: "center", width: "120px" }}>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((payout) => (
            <Table.Tr key={payout.id} onClick={() => onRowClick(payout)} style={{ cursor: "pointer" }}>
              <Table.Td>{payout.invoice}</Table.Td>
              <Table.Td>
                {payout.nominal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 2,
                })}
              </Table.Td>
              <Table.Td>
                {new Intl.DateTimeFormat("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(payout.due_date))}
              </Table.Td>
              <Table.Td>
                <Group gap="xs" justify="center">
                  <ThemeIcon size="sm" radius="xl" color={payout.status === "tempo" ? "red" : "green"} />
                </Group>
              </Table.Td>
              <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PayPayoutButton payout={payout} refetchPayoutData={refetchPayoutData} />
                  <EditPayoutModal payout={payout} refetchPayoutData={refetchPayoutData} />
                  <ButtonDeleteWithConfirmation
                    id={payout.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${payout.invoice}?`}
                    size={2}
                  />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

import { formatDateIndonesia } from "@/lib/formatDateIndonesia";
import { Modal, Stack, TextInput, Textarea, Button, Divider, Title, Text, Group, Flex } from "@mantine/core";
import { IconCash, IconClock } from "@tabler/icons-react";
// ganti sesuai path interface kamu

interface PayoutDetailsProps {
  payout: IPayoutUpdate | null;
  opened: boolean;
  onClose: () => void;
  refetchPayoutData: () => void;
}

export default function PayoutDetails({ payout, opened, onClose, refetchPayoutData }: PayoutDetailsProps) {
  return (
    <Modal opened={opened} onClose={onClose} size="lg" yOffset="100px" radius="md">
      {payout && (
        <Stack gap="sm" mt={12} p={20}>
          <Flex justify="space-between" align="center" w="100%">
            {/* Kiri: Detail Payout */}
            <Group>
              <Title order={4}>Detail Payout - {payout?.invoice}</Title>
            </Group>

            {/* Kanan: Icon status */}
            <Group>
              {payout?.status === "tunai" ? (
                <>
                  <IconCash size={32} color="green" />
                  <Text fw={500} color="green">
                    Tunai
                  </Text>
                </>
              ) : (
                <>
                  <IconClock size={32} color="orange" />
                  <Text fw={500} color="orange">
                    Tempo
                  </Text>
                </>
              )}
            </Group>
          </Flex>

          <TextInput label="Invoice" value={payout.invoice} readOnly />

          <TextInput label="Nominal" value={`Rp ${payout.nominal.toLocaleString("id-ID")}`} readOnly />

          <TextInput label="Tanggal Pembelian" value={formatDateIndonesia(payout.date_inputed)} readOnly />
          <TextInput label="Jatuh Tempo" value={formatDateIndonesia(payout.due_date)} readOnly />

          <TextInput
            label="Tanggal Pembayaran"
            value={payout.payment_date ? formatDateIndonesia(payout.payment_date) : "Belum dibayar"}
            readOnly
          />
          <Textarea label="Catatan" value={payout.note || "-"} readOnly minRows={2} />

          <Divider my="sm" />

          <Button fullWidth variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </Stack>
      )}
    </Modal>
  );
}

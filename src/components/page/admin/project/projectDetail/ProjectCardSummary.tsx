import { Card, Group, Stack, Text } from "@mantine/core";

interface ProjectCardSummaryProps {
  totalCashIn?: number;
  totalCashOut?: number;
  grossProfit?: number;
  materialCost?: number;
  workerCost?: number;
}

const ProjectCardSummary: React.FC<ProjectCardSummaryProps> = ({
  totalCashIn = 0,
  totalCashOut = 0,
  grossProfit = 0,
  materialCost = 0,
  workerCost = 0,
}) => {
  return (
    <Card shadow="lg" padding="xs" radius="md" withBorder mt={10}>
      <Card shadow="sm" padding="lg" radius="md" withBorder mt={10}>
        <Stack gap="10">
          <Text size="lg" fw={900} c="cyan" ta="center">
            Ringkasan Keuangan
          </Text>

          <Group justify="space-between">
            <Text size="md" fw={500} c="green">
              Uang Masuk
            </Text>
            <Text size="md" fw={600}>
              Rp {totalCashIn.toLocaleString("id-ID")}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text size="md" fw={500} c="red">
              Uang Keluar
            </Text>
            <Text size="md" fw={600}>
              Rp {totalCashOut.toLocaleString("id-ID")}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text size="md" fw={500} c="orange">
              Margin
            </Text>
            <Text size="md" fw={600}>
              Rp {grossProfit.toLocaleString("id-ID")}
            </Text>
          </Group>
        </Stack>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder mt={10}>
        <Stack gap="10">
          <Text size="lg" fw={900} c="cyan" ta="center">
            Ringkasan Pembangunan
          </Text>

          <Group justify="space-between">
            <Text size="md" fw={500} c="green">
              Pengeluaran Material
            </Text>
            <Text size="md" fw={600}>
              Rp {materialCost.toLocaleString("id-ID")}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text size="md" fw={500} c="red">
              Pengeluaran Pekerja
            </Text>
            <Text size="md" fw={600}>
              Rp {workerCost.toLocaleString("id-ID")}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text size="md" fw={500} c="orange">
              Total Pengeluaran Proyek
            </Text>
            <Text size="md" fw={600}>
              Rp {(workerCost + materialCost).toLocaleString("id-ID")}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Card>
  );
};

export default ProjectCardSummary;

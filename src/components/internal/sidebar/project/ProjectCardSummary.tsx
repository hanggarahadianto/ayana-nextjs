import { Card, Divider, Group, Progress, Stack, Text, Tooltip } from "@mantine/core";

interface ProjectCardSummaryProps {
  totalPercentage: number;
  projectDataDetail?: { note?: string };
  totalCashIn?: number;
  totalCashOut?: number;
  totalOutstanding?: number;
}

const ProjectCardSummary: React.FC<ProjectCardSummaryProps> = ({
  totalPercentage,
  projectDataDetail,
  totalCashIn = 0,
  totalCashOut = 0,
  totalOutstanding = 0,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Text size="xl" fw={900} c="cyan">
          Progress Proyek
        </Text>
        <Progress.Root size={40} w="min(400px, 90vw)">
          <Tooltip label={`Progress Proyek: ${totalPercentage}%`}>
            <Progress.Section value={totalPercentage} color="blue">
              <Progress.Label>{totalPercentage}%</Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root>
        <Group gap={10}>
          <Text size="lg" fw={900}>
            Catatan :
          </Text>
          <Text size="lg" fw={900}>
            {projectDataDetail?.note ? projectDataDetail.note.charAt(0).toUpperCase() + projectDataDetail.note.slice(1).toLowerCase() : "-"}
          </Text>
        </Group>
      </Stack>

      <Card shadow="sm" padding="lg" radius="md" withBorder mt={10}>
        <Stack gap="sm">
          <Text size="lg" fw={900} c="cyan" ta="center">
            Ringkasan Keuangan
          </Text>
          <Divider />

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
              Uang Terhutang
            </Text>
            <Text size="md" fw={600}>
              Rp {totalOutstanding.toLocaleString("id-ID")}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Card>
  );
};

export default ProjectCardSummary;

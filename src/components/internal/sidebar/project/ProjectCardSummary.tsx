import { Card, Divider, Group, Progress, Stack, Text, Tooltip } from "@mantine/core";

interface ProjectCardSummaryProps {
  projectDataDetail?: { note?: string };
  totalCashIn?: number;
  totalCashOut?: number;
  grossProfit?: number;
}

const ProjectCardSummary: React.FC<ProjectCardSummaryProps> = ({
  projectDataDetail,
  totalCashIn = 0,
  totalCashOut = 0,
  grossProfit = 0,
}) => {
  console.log(projectDataDetail);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={8}>
      <Stack>
        {/* <Text size="xl" fw={900} c="cyan">
          Progress Proyek
        </Text>
        <Progress.Root size={40} w="min(400px, 90vw)">
          <Tooltip label={`Progress Proyek: ${totalPercentage}%`}>
            <Progress.Section value={totalPercentage} color="blue">
              <Progress.Label>{totalPercentage}%</Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root> */}
        <Group gap={10}>
          <Text size="sm" fw={900}>
            CATATAN :
          </Text>
          <Text size="sm" fw={900} style={{ maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {projectDataDetail?.note ?? "-"}
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
              Margin
            </Text>
            <Text size="md" fw={600}>
              Rp {grossProfit.toLocaleString("id-ID")}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Card>
  );
};

export default ProjectCardSummary;

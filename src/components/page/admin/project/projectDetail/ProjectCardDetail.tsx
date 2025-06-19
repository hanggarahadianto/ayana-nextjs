import { Card, Grid, Text, Group, Stack, SimpleGrid, Box, Divider } from "@mantine/core";
import AddCashFlowReportModal from "../cashFlow/AddCashFlowReportModal";
import EditCashFlowReportModal from "../cashFlow/EditCashFlowReportModal";
import GetCashFlowReportModal from "../cashFlow/GetCashFlowReportModal";
import { FC } from "react";
import EditProjectModal from "./EditProjectModal";

const ProjectCardDetail: FC<{
  projectDataDetail?: IProjectItem;
  cashFlowData?: ICashFlowResponse;
  refetchProjectData: () => void;
  refetchCashFlowData: () => void;
  totalCashIn: any;
}> = ({ projectDataDetail, cashFlowData, refetchProjectData, refetchCashFlowData, totalCashIn }) => {
  console.log("cash flow data di card", cashFlowData);
  return (
    <Card
      shadow="xl"
      padding="lg"
      radius="md"
      style={{
        background: "linear-gradient(135deg, #16a34a, #22c55e)",
        color: "white",
        width: "100%",
      }}
    >
      <SimpleGrid>
        <Grid>
          <Grid.Col span={6}>
            <Text fw={900} size="xl">
              {projectDataDetail?.project_name}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack variant="white" style={{ cursor: "pointer" }} align="flex-end">
              <EditProjectModal initialData={projectDataDetail} refetchProjectData={refetchProjectData} />
            </Stack>
          </Grid.Col>
        </Grid>
        <Text fw={700} size="1.5rem">
          {projectDataDetail?.investor}
        </Text>

        <Text fw={400} mt={-4} size="md">
          {projectDataDetail?.project_leader}
        </Text>
        <Text fw={700} size="md">
          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(projectDataDetail?.total_cost || 0)}
        </Text>
        <Divider mt={-8} my="xs" color="white" />
        <Card
          mt={-12}
          shadow="xl"
          padding="xs"
          radius="md"
          style={{
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            color: "white",
            width: "100%",
            maxWidth: "100%", // Mengikuti lebar layar
          }}
        >
          <Grid grow justify="flex-start">
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <Stack align="flex-start" p={10} ml={20}>
                <Text fw={600} mb={12}>
                  Buku Kas Umum
                </Text>
                <Group wrap="wrap" gap="md">
                  <AddCashFlowReportModal
                    projectName={projectDataDetail?.project_name ?? ""}
                    projectId={projectDataDetail?.id ?? ""}
                    refetchCashFlowData={refetchCashFlowData}
                    cashFlowData={cashFlowData ? [cashFlowData] : undefined}
                  />
                  <EditCashFlowReportModal
                    projectName={projectDataDetail?.project_name ?? ""}
                    refetchCashFlowData={refetchCashFlowData}
                    cashFlowData={cashFlowData?.data ?? []}
                  />

                  <GetCashFlowReportModal
                    projectName={projectDataDetail?.project_name ?? "-"}
                    cashFlowData={cashFlowData?.data ?? []}
                    totalCost={totalCashIn}
                  />
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
              <Stack justify="center" align="center">
                <Text size="sm" fw={900}>
                  Realisasi Investor
                </Text>
                <Text size="lg" fw={900}>
                  Rp {totalCashIn?.toLocaleString("id-ID")}
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        <Box
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "1rem",
            borderRadius: "0.5rem",
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "100px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <Text fw={600}>Catatan Proyek</Text>
          <Text>{projectDataDetail?.note || "Tidak ada catatan."}</Text>
        </Box>
      </SimpleGrid>
    </Card>
  );
};

export default ProjectCardDetail;

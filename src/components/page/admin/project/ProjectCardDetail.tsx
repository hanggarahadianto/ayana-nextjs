import { Card, Grid, Text, Group, Stack, SimpleGrid, Box, Divider } from "@mantine/core";
import AddCashFlowReportModal from "./cashFlow/AddCashFlowReportModal";
import EditCashFlowReportModal from "./cashFlow/EditCashFlowReportModal";
import GetCashFlowReportModal from "./cashFlow/GetCashFlowReportModal";
import EditProjectModal from "./EditProjectModal";
import { FC } from "react";

const ProjectCardDetail: FC<{
  projectDataDetail?: IProject;
  cashFlowData?: ICashFlowResponse;
  refetchProjectData: () => void;
  refetchCashFlowData: () => void;
  totalCashIn: any;
}> = ({ projectDataDetail, cashFlowData, refetchProjectData, refetchCashFlowData, totalCashIn }) => {
  console.log("cash flow data di card", cashFlowData);
  return (
    <Grid.Col span={{ base: 12, sm: 6, md: 20 }}>
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
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SimpleGrid w={"100%"}>
            <Group justify="space-between">
              <Text fw={900} size="2rem" mt={-20}>
                {projectDataDetail?.project_name}
              </Text>

              <Group variant="white" mr={0} style={{ cursor: "pointer" }}>
                <EditProjectModal initialData={projectDataDetail} refetchProjectData={refetchProjectData} />
              </Group>
            </Group>
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
                        projectId={projectDataDetail?.id ?? ""}
                        refetchCashFlowData={refetchCashFlowData}
                        cashFlowData={cashFlowData ? [cashFlowData] : undefined}
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
            {/* <Divider my="sm" color="white" /> */}

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
        </Box>
      </Card>
    </Grid.Col>
  );
};

export default ProjectCardDetail;

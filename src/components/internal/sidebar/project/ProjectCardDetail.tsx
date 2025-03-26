import { Card, Grid, Text, Group, Stack, SimpleGrid, Box } from "@mantine/core";
import AddCashFlowReportModal from "./cashFlow/AddCashFlowReportModal";
import EditCashFlowReportModal from "./cashFlow/EditCashFlowReportModal";
import GetCashFlowReportModal from "./cashFlow/GetCashFlowReportModal";
import EditProjectModal from "./EditProjectModal";
import { FC } from "react";

const ProjectCardDetail: FC<{
  projectDataDetail: any;
  cashFlowData: any;
  refetchProjectData: () => void;
  refetchCashFlowData: () => void;
  totalCashIn: any;
}> = ({ projectDataDetail, cashFlowData, refetchProjectData, refetchCashFlowData, totalCashIn }) => {
  return (
    <Grid.Col span={{ base: 12, sm: 6, md: 20 }} mr={40}>
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        style={{
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          color: "white",
          // minWidth: "280px",
          // maxWidth: "82vw",
          width: "100%",
        }}
      >
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SimpleGrid>
            <Group justify="space-between">
              <Text fw={900} size="1.5rem">
                {projectDataDetail?.project_name}
              </Text>
              <Group variant="white" mr={0} style={{ cursor: "pointer" }}>
                <EditProjectModal initialData={projectDataDetail} refetchProjectData={refetchProjectData} />
              </Group>
            </Group>

            <Text fw={700} size="md">
              {projectDataDetail?.project_leader}
            </Text>
            <Text fw={700} size="md">
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(projectDataDetail?.total_cost || 0)}
            </Text>
            <Card
              w={800}
              shadow="md"
              padding="lg"
              radius="md"
              style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", width: "450px" }}
            >
              <Grid>
                <Grid.Col span={3.2}>
                  <Stack>
                    <Text fw={600} mb={12}>
                      Buku Kas Umum
                    </Text>
                    <Group gap={12}>
                      <AddCashFlowReportModal
                        projectName={projectDataDetail?.project_name}
                        projectId={projectDataDetail?.id}
                        refetchCashFlowData={refetchCashFlowData}
                        cashFlowData={cashFlowData?.data || []}
                      />
                      <EditCashFlowReportModal
                        projectName={projectDataDetail?.project_name}
                        cashFlowData={cashFlowData?.data || []}
                        refetchCashFlowData={refetchCashFlowData}
                        projectId={projectDataDetail?.id}
                      />
                      <Stack ml={12}>
                        <GetCashFlowReportModal
                          projectName={projectDataDetail?.project_name}
                          cashFlowData={cashFlowData?.data || []}
                          totalCost={projectDataDetail?.total_cost}
                        />
                      </Stack>
                    </Group>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={2.5}>
                  <Stack justify="flex-start" align="start">
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
          </SimpleGrid>
        </Box>
      </Card>
    </Grid.Col>
  );
};

export default ProjectCardDetail;

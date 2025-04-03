"use client";

import { Box, Card, Divider, Grid, Group, Progress, RingProgress, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import AddCashFlowReportModal from "../../../../../src/components/internal/sidebar/project/cashFlow/AddCashFlowReportModal";
import GetCashFlowReportModal from "../../../../../src/components/internal/sidebar/project/cashFlow/GetCashFlowReportModal";

import EditProjectModal from "../../../../../src/components/internal/sidebar/project/EditProjectModal";
import EditCashFlowReportModal from "../../../../../src/components/internal/sidebar/project/cashFlow/EditCashFlowReportModal";
import { getDataProjectDetail } from "@/api/project/getDataProjectDetail";
import { getDataWeeklyProgress } from "@/api/weekly-progress/getDataWeeklyProgress";
import { getDataCashFlowListByProjectId } from "@/api/cash-flow/getCashFlowListProject";

import { FC, use } from "react";
import ProjectCardDetail from "@/components/internal/sidebar/project/ProjectCardDetail";
import ProjectCardSummary from "@/components/internal/sidebar/project/ProjectCardSummary";
import WeeklyProgressMenu from "@/components/internal/sidebar/project/weeklyProgress/WeeklyProgressMenu";

interface ProjectProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectDetailPage: FC<ProjectProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.projectId;

  const {
    data: projectDataDetail,
    isLoading: isLoadingGetProjectData,
    refetch: refetchProjectData,
  } = useQuery({
    queryKey: ["getProjectDetailtData"],
    queryFn: () => getDataProjectDetail(projectId),
    refetchOnWindowFocus: false,
  });

  const {
    data: weeklyProgressData,
    isLoading: isLoadingGetWeeklyProgressData,
    refetch: refetchWeeklyProgressData,
  } = useQuery({
    queryKey: ["getWeeklyProgressData"],
    queryFn: () => getDataWeeklyProgress(projectId),
    refetchOnWindowFocus: false,
  });

  const {
    data: cashFlowData,
    isLoading: isLoadingCashFlowData,
    refetch: refetchCashFlowData,
  } = useQuery({
    queryKey: ["getCashFlowData"],
    queryFn: () => getDataCashFlowListByProjectId(projectId),
    refetchOnWindowFocus: false,
  });

  const totalCashIn = cashFlowData?.data.reduce((sum, item) => sum + item.cash_in, 0);
  const totalCashOut = cashFlowData?.data.reduce((sum, item) => sum + item.cash_out, 0);

  let grossProfit = (totalCashIn ?? 0) - (totalCashOut ?? 0);
  const progress = 20;

  return (
    <>
      <Grid p={16}>
        <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
          <ProjectCardDetail
            projectDataDetail={projectDataDetail}
            cashFlowData={cashFlowData}
            refetchProjectData={refetchProjectData}
            refetchCashFlowData={refetchCashFlowData}
            totalCashIn={totalCashIn}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
          <ProjectCardSummary
            projectDataDetail={projectDataDetail}
            totalCashIn={totalCashIn}
            totalCashOut={totalCashOut}
            grossProfit={grossProfit}
          />
        </Grid.Col>
      </Grid>
      <Stack justify="center" align="center">
        <Card
          shadow="md"
          radius="lg"
          p="xs"
          withBorder
          style={{
            maxWidth: "960px",
            width: "90vw",
            // background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
            border: "1px solid rgba(0, 155, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack gap="lg" align="center">
            <Text size="xl" fw={900} c="cyan.8">
              Progress Proyek
            </Text>

            <Progress.Root
              size={40}
              w="100%"
              radius="md"
              // bg="gray.2"
              style={{
                overflow: "visible",
                border: "1px solid rgba(0, 155, 255, 0.1)",
              }}
            >
              <Tooltip label={`Progress Proyek: ${progress ?? 0}%`} color="blue.6" position="top" offset={20} withArrow>
                <Progress.Section
                  value={progress ?? 1}
                  color="blue"
                  animated
                  style={{
                    background: "linear-gradient(45deg, #00b7ff 0%, #005eff 100%)",
                    transition: "width 0.6s ease-in-out",
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  <Progress.Label
                    style={{
                      color: "white",
                      fontWeight: 600,
                      padding: "0 16px",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                      position: "absolute",
                      right: "8px",
                      transform: "translateX(0)",
                    }}
                  >
                    {progress ?? 0}%
                  </Progress.Label>
                </Progress.Section>
              </Tooltip>
            </Progress.Root>
          </Stack>
        </Card>
      </Stack>

      <Divider mt={40} mb={20} />
      <WeeklyProgressMenu
        refetchWeeklyProgressData={refetchWeeklyProgressData}
        projectDataDetail={projectDataDetail}
        weeklyProgressData={weeklyProgressData}
        handleCardClick={undefined}
        handleDeleteWeeklyProgress={undefined}
      />
    </>
  );
};

export default ProjectDetailPage;

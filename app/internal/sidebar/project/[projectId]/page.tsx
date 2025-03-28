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
      <Stack p={24}>
        <Text size="xl" fw={900} c="cyan">
          Progress Proyek
        </Text>
        <Progress.Root size={40} w="min(920px, 90vw)">
          <Tooltip label={`Progress Proyek: ${undefined}%`}>
            <Progress.Section value={1} color="blue">
              <Progress.Label>%</Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root>
      </Stack>

      <Divider mt={40} mb={20} />
      <WeeklyProgressMenu
        refetchWeeklyProgressData={refetchWeeklyProgressData}
        projectDataDetail={projectDataDetail}
        weeklyProgressData={weeklyProgressData}
        handleCardClick={undefined}
        handleDeleteWeeklyProgress={undefined}
      />

      {/*



      {/* Edit Modal */}
      {/* {isModalOpen && selectedProgress && (
        <EditWeeklyProgressModal
          projectId={projectDataDetail?.id}
          refetchWeeklyProgressData={refetchWeeklyProgressData}
          initialData={selectedProgress}
          onClose={handleModalClose}
        />
      )} */}
    </>
  );
};

export default ProjectDetailPage;

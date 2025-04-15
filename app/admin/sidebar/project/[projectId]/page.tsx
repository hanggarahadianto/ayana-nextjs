"use client";

import { Divider, Grid, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getDataProjectDetail } from "@/api/project/getDataProjectDetail";
import { getDataWeeklyProgress } from "@/api/weekly-progress/getDataWeeklyProgress";
import { getDataCashFlowListByProjectId } from "@/api/cash-flow/getCashFlowListProject";

import { FC, use } from "react";
import ProjectCardDetail from "@/components/page/admin/project/ProjectCardDetail";
import ProjectCardSummary from "@/components/page/admin/project/projectDetail/ProjectCardSummary";
import WeeklyProgressMenu from "@/components/page/admin/project/weeklyProgress/WeeklyProgressMenu";
import LoadingGlobal from "@/helper/styles/loading/loading-global";
import ProgressBar from "@/components/page/admin/project/projectDetail/progressBar";

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
        <LoadingGlobal visible={isLoadingCashFlowData || isLoadingGetProjectData || isLoadingGetWeeklyProgressData} />
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
      <Divider mt={40} mb={20} />

      <Stack justify="center" align="center">
        <ProgressBar progress={progress} />
      </Stack>

      <Stack mt={20}>
        <WeeklyProgressMenu
          refetchWeeklyProgressData={refetchWeeklyProgressData}
          projectDataDetail={projectDataDetail}
          weeklyProgressData={weeklyProgressData}
        />
      </Stack>
    </>
  );
};

export default ProjectDetailPage;

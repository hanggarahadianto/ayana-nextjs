"use client";

import { FC } from "react";
import { Divider, Grid, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getDataProjectDetail } from "@/api/project/getDataProjectDetail";
import { getDataWeeklyProgress } from "@/api/weekly-progress/getDataWeeklyProgress";
import { getDataCashFlowListByProjectId } from "@/api/cash-flow/getCashFlowListProject";
import ProjectCardDetail from "@/components/page/admin/project/projectData/projectDetail/ProjectCardDetail";
import ProjectCardSummary from "@/components/page/admin/project/projectData/projectDetail/ProjectCardSummary";
import WeeklyProgressMenu from "@/components/page/admin/project/projectData/projectDetail/weeklyProgress/WeeklyProgressMenu";
import LoadingGlobal from "@/styles/loading/loading-global";
import ProgressBar from "@/components/page/admin/project/projectData/projectDetail/progressBar";
import { progressProject, totalMaterialCost, totalWorkerCost } from "@/lib/projectProgressUtils";

interface ProjectDetailProps {
  projectId: string;
  initialData?: IProjectItem; // Optional untuk data yang sudah di-fetch di server
}

const AdminProjectDetailComponent: FC<ProjectDetailProps> = ({ projectId, initialData }) => {
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
  const currentPercentage = progressProject(weeklyProgressData?.data || []);
  const materialCost = totalMaterialCost(weeklyProgressData?.data || []);
  const workerCost = totalWorkerCost(weeklyProgressData?.data || []);

  return (
    <>
      <Grid>
        <LoadingGlobal visible={isLoadingCashFlowData || isLoadingGetProjectData || isLoadingGetWeeklyProgressData} />
        <Grid.Col span={{ base: 10, sm: 5, md: 7 }}>
          <ProjectCardDetail
            projectDataDetail={projectDataDetail}
            cashFlowData={cashFlowData || undefined}
            refetchProjectData={refetchProjectData}
            refetchCashFlowData={refetchCashFlowData}
            totalCashIn={totalCashIn ?? 0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, sm: 5, md: 5 }}>
          <ProjectCardSummary
            totalCashIn={totalCashIn}
            totalCashOut={totalCashOut}
            grossProfit={grossProfit}
            materialCost={materialCost}
            workerCost={workerCost}
          />
        </Grid.Col>
      </Grid>
      <Divider mt={40} mb={20} />

      <Stack justify="center" align="center" style={{ width: "100%" }}>
        <ProgressBar progress={currentPercentage} />
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

export default AdminProjectDetailComponent;

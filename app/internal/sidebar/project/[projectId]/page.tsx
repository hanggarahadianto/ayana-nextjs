"use client";

import { getDataProjectDetail } from "@/src/api/project/getDataProjectDetail";
import { Box, Card, Divider, Grid, Group, Progress, RingProgress, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { FC, use, useState } from "react";
import { getDataWeeklyProgress } from "@/src/api/weekly-progress/getDataWeeklyProgress";
import AddWeeklyProgressModal from "./AddWeeklyProgressModal";
import AddCashFlowReportModal from "./AddCashFlowReportModal";
import { getDataCashFlowById } from "@/src/api/cash-flow/getDataCashFlowById";
import GetCashFlowReportModal from "./GetCashFlowReportModal";
import EditWeeklyProgressModal from "./EditWeeklyProgressModal";
import EditProjectModal from "../EditProjectModal";
import { useDeleteDataWeeklyProgress } from "@/src/api/weekly-progress/deleteDataWeeklyProgress";
import ButtonDeleteWithConfirmation from "@/src/components/button/buttonDeleteConfirmation";
import EditCashFlowReportModal from "./EditCashFlowReportModal";
import { getDataCashFlowListByProjectId } from "@/src/api/cash-flow/getCashFlowListyProject";

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

  const { mutate: mutateDeleteDataWeeklyProgress, isPending: isLoadingDeleteDataWeeklyProgress } =
    useDeleteDataWeeklyProgress(refetchWeeklyProgressData);

  const [selectedProgress, setSelectedProgress] = useState<IWeeklyProgress | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (weeklyProgress: IWeeklyProgress) => {
    setSelectedProgress(weeklyProgress);
    setIsModalOpen(true);
  };

  const handleDeleteWeeklyProgress = (idToDelete: string) => {
    mutateDeleteDataWeeklyProgress(idToDelete); // Pass only the string, not an object
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProgress(null); // Optionally reset selected progress
  };

  console.log("weeklyProgressdata", weeklyProgressData?.data);
  console.log("cashFlowData", cashFlowData?.data);

  const totalPercentage = (weeklyProgressData?.data ?? []).reduce((sum, progress) => sum + Number(progress.percentage), 0);
  return (
    <>
      <Grid>
        <Grid.Col span={5}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            style={{
              background: "linear-gradient(135deg, #16a34a, #22c55e)", // Green gradient
              color: "white",
              width: "520px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SimpleGrid>
                <Group justify="space-between">
                  <Text fw={900} size={"2.5rem"}>
                    {projectDataDetail?.project_name}
                  </Text>
                  <Group variant="white" mr={0} style={{ cursor: "pointer" }}>
                    <EditProjectModal initialData={projectDataDetail as IProjectUpdate} refetchProjectData={refetchProjectData} />
                  </Group>
                </Group>

                <Text fw={700} size="xl">
                  {projectDataDetail?.project_leader}
                </Text>
                <Text fw={700} size="xl">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(projectDataDetail?.total_cost || 0)}
                </Text>
                <Card
                  w={800}
                  shadow="md"
                  padding="lg"
                  radius="md"
                  style={{
                    background: "linear-gradient(135deg, #16a34a, #22c55e)", // Green gradient
                    color: "white",
                    width: "450px",
                  }}
                >
                  <Text fw={900} mb={12}>
                    Buku Kas Umum
                  </Text>
                  <Group gap={18}>
                    <AddCashFlowReportModal
                      projectName={projectDataDetail?.project_name}
                      refetchCashFlowData={refetchCashFlowData}
                      projectId={projectDataDetail?.id}
                    />
                    <EditCashFlowReportModal
                      projectName={projectDataDetail?.project_name}
                      refetchCashFlowData={refetchCashFlowData}
                      projectId={projectDataDetail?.id}
                    />
                    <Stack ml={20}>
                      <GetCashFlowReportModal
                        projectName={projectDataDetail?.project_name}
                        cashFlowData={cashFlowData?.data || []}
                        refetchWeeklyProgressData={refetchWeeklyProgressData}
                        totalCost={projectDataDetail?.total_cost}
                      />
                    </Stack>
                  </Group>
                </Card>
              </SimpleGrid>
            </Box>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack mt={40}>
            <Text size="xl" fw={900}>
              Progress Proyek
            </Text>
            <Progress.Root size={40} w={800}>
              <Tooltip label={`Progress Proyek: ${totalPercentage}%`}>
                <Progress.Section value={totalPercentage} color="blue">
                  <Progress.Label>{totalPercentage}%</Progress.Label>
                </Progress.Section>
              </Tooltip>
            </Progress.Root>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider mt={40} mb={20} />

      <Group justify="space-between">
        <Text fw={700} size="1.5rem">
          Progress Mingguan
        </Text>
        <AddWeeklyProgressModal refetchWeeklyProgressData={refetchWeeklyProgressData} projectId={projectDataDetail?.id} />
      </Group>

      <SimpleGrid mt={40} cols={4} spacing="lg">
        {weeklyProgressData?.data.map((weeklyProgress: IWeeklyProgress) => {
          return (
            <Card
              key={weeklyProgress.id}
              style={{
                background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <Stack gap={4} onClick={() => handleCardClick(weeklyProgress)}>
                <Group justify="space-between">
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    Minggu Ke {weeklyProgress.week_number}
                  </Text>

                  <RingProgress
                    size={100}
                    sections={[{ value: Number(weeklyProgress.percentage), color: "cyan" }]}
                    label={
                      <Text c="blue" fw={700} ta="center" size="xl">
                        {weeklyProgress.percentage}%
                      </Text>
                    }
                  />
                </Group>
                <Grid w={400} mt={22}>
                  <Grid.Col span={5}>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      Biaya Material
                    </Text>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      Jumlah Pekerja
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Text fw={500} style={{ color: "#ffffff" }}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(weeklyProgress.amount_material || 0)}
                    </Text>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      {weeklyProgress.amount_worker} Orang
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
              <Stack align="flex-end">
                <ButtonDeleteWithConfirmation
                  id={weeklyProgress?.id}
                  onDelete={handleDeleteWeeklyProgress}
                  description={`Apakah anda yakin ingin menghapus progress minggu ke ${weeklyProgress?.week_number} ?`}
                />
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Edit Modal */}
      {isModalOpen && selectedProgress && (
        <EditWeeklyProgressModal
          projectId={projectDataDetail?.id}
          refetchWeeklyProgressData={refetchWeeklyProgressData}
          initialData={selectedProgress}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ProjectDetailPage;

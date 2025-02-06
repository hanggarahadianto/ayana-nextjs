"use client";

import { getDataProjectDetail } from "@/src/api/project/getDataProjectDetail";
import { ActionIcon, Box, Button, Card, Divider, Grid, Group, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { FC, use, useState } from "react";
import { getDataWeeklyProgress } from "@/src/api/weekly-progress/getDataWeeklyProgress";
import AddWeeklyProgressModal from "./AddWeeklyProgressModal";
import AddCashFlowReportModal from "./AddCashFlowReportModal";
import { IconEye, IconSettings } from "@tabler/icons-react";
import { getDataCashFlow } from "@/src/api/cash-flow/getDataCashFlow";
import GetCashFlowReportModal from "./GetCashFlowReportModal";
import EditWeeklyProgressModal from "./EditWeeklyProgressModal";
import { FiSettings } from "react-icons/fi";
import EditProjectModal from "../EditProjectModal";

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
    queryFn: () => getDataCashFlow(projectId),
    refetchOnWindowFocus: false,
  });

  const [selectedProgress, setSelectedProgress] = useState<IWeeklyProgress | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (weeklyProgress: IWeeklyProgress) => {
    setSelectedProgress(weeklyProgress);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProgress(null); // Optionally reset selected progress
  };

  console.log("weeklyProgressdata", weeklyProgressData?.data);

  return (
    <>
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        style={{
          background: "linear-gradient(135deg, #16a34a, #22c55e)", // Green gradient
          color: "white",
          width: "450px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack>
            <Group justify="space-between">
              <Text fw={900} size={"2.5rem"}>
                {projectDataDetail?.project_name}
              </Text>
              <Group variant="white" mr={40} style={{ cursor: "pointer" }}>
                {/* <FiSettings size={24} /> */}
                <EditProjectModal initialData={projectDataDetail as IProjectUpdate} refetchProjectData={refetchProjectData} />
              </Group>
            </Group>

            <Text fw={700}>{projectDataDetail?.project_leader}</Text>
            <Text fw={700}>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(projectDataDetail?.total_cost || 0)}
            </Text>
            <Card
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
              <Group gap={24}>
                <AddCashFlowReportModal
                  projectName={projectDataDetail?.project_name}
                  refetchCashFlowData={refetchCashFlowData}
                  projectId={projectDataDetail?.id}
                />
                <GetCashFlowReportModal
                  projectName={projectDataDetail?.project_name}
                  cashFlowData={cashFlowData?.data || []}
                  refetchWeeklyProgressData={refetchWeeklyProgressData}
                  totalCost={projectDataDetail?.total_cost}
                />
              </Group>
            </Card>
          </Stack>
        </Box>
      </Card>
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
              onClick={() => handleCardClick(weeklyProgress)}
              key={weeklyProgress.id} // Ensure unique key for each card
              style={{
                background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <Stack gap={4} align="start">
                <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                  Minggu Ke {weeklyProgress.week_number}
                </Text>
                <Grid w={400} mt={12}>
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

"use client";

import { getDataProjectDetail } from "@/src/api/project/getDataProjectDetail";
import {
  Button,
  Card,
  Grid,
  Group,
  InputWrapper,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { FC, use } from "react";
import { getDataWeeklyProgress } from "@/src/api/weekly-progress/getDataWeeklyProgress";
import Link from "next/link";
import AddWeeklyProgressModal from "./AddWeeklyProgressModal";

interface ProjectProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectDetailPage: FC<ProjectProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.projectId;

  // Fetch project data
  const {
    data: projectDataDetail,
    isLoading: isLoadingGetProjectData,
    refetch: refetchProjectData,
  } = useQuery({
    queryKey: ["getProjectDetailtData"],
    queryFn: () => getDataProjectDetail(projectId),
    refetchOnWindowFocus: false,
  });

  // Fetch weekly progress data
  const {
    data: weeklyProgressData,
    isLoading: isLoadingGetWeeklyProgressData,
    refetch: refetchWeeklyProgressData,
  } = useQuery({
    queryKey: ["getWeeklyProgressData"],
    queryFn: () => getDataWeeklyProgress(projectId),
    refetchOnWindowFocus: false,
  });

  console.log("weekly progress", weeklyProgressData);

  return (
    <>
      <Text>{projectDataDetail?.project_name}</Text>
      <Text>{projectDataDetail?.project_leader}</Text>
      <Text>DETAIL</Text>
      <AddWeeklyProgressModal />
      <SimpleGrid
        mt={40}
        cols={4} // Default to 4 columns
        spacing="lg" // Spacing between cards
      >
        {weeklyProgressData?.data.map((weeklyProgress: IWeeklyProgress) => {
          // Log to ensure the map function runs
          console.log("Rendering Card", weeklyProgress);

          return (
            <Card
              key={weeklyProgress.id} // Ensure unique key for each card
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
              }}
            >
              <Stack gap={4} align="start">
                <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                  {weeklyProgress.week_number}
                </Text>
                <Grid w={400}>
                  <Grid.Col span={6}>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      Biaya Material
                    </Text>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      Jumlah Pekerja
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      {weeklyProgress.amount_material}
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
    </>
  );
};

export default ProjectDetailPage;

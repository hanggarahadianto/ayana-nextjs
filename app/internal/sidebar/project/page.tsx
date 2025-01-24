"use client";

import {
  Button,
  Card,
  Group,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Badge,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import AddProjectModal from "./AddProjectModal";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getDataProject } from "@/src/api/project/getDataProject";

const TaskPage = () => {
  const [modalCreateOpened, setModalCreateOpened] = useState(false);
  const handleAddNew = () => {
    setModalCreateOpened(true);
  };

  const {
    data: projectData,
    isLoading: isLoadingGetProjectData,
    refetch: refetchProjectData,
  } = useQuery({
    queryKey: ["getProjectData"],
    queryFn: () => getDataProject(),
    // enabled: !!token,
    refetchOnWindowFocus: false,
  });

  console.log(projectData);

  return (
    <>
      <AddProjectModal refetchProjectData={refetchProjectData} />

      <SimpleGrid
        mt={40}
        cols={4} // Default to 4 columns
        spacing="lg" // Spacing between cards
        // Adjust minimum width for responsiveness
      >
        {projectData?.data.map((project) => {
          // Log the project data to the console
          console.log(project);

          return (
            <Card
              key={project.id} // Ensure unique key for each card
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
              }}
            >
              <Link
                href={`/internal/sidebar/project/${project.id}`}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Stack gap={4} align="start">
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    {project.project_name}
                  </Text>
                  <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                    {project.project_leader}
                  </Text>
                </Stack>
              </Link>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default TaskPage;

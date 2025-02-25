"use client";

import { Button, Card, Group, SimpleGrid, Text, Stack, ActionIcon } from "@mantine/core";

import AddProjectModal from "./AddProjectModal";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { getDataProject } from "@/api/project/getDataProject";
import { useDeleteDataProject } from "@/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/components/button/buttonDeleteConfirmation";

const ProjectPage = () => {
  const {
    data: projectData,
    isLoading: isLoadingGetProjectData,
    refetch: refetchProjectData,
  } = useQuery({
    queryKey: ["getProjectData"],
    queryFn: () => getDataProject(),
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataProject, isPending: isLoadingDeleteDataProject } = useDeleteDataProject(refetchProjectData);

  const handleDeleteProject = (idToDelete: string) => {
    mutateDeleteDataProject(idToDelete); // Pass only the string, not an object
  };

  console.log("Project Data", projectData?.data);

  return (
    <>
      <Group justify="space-between">
        <Text fw={900} size="2rem">
          Daftar Project
        </Text>
        <Stack mr={40}>
          <AddProjectModal refetchProjectData={refetchProjectData} />
        </Stack>
      </Group>

      <SimpleGrid mt={40} cols={4} p={40}>
        {projectData?.data.map((project) => (
          <Card
            key={project.id}
            w={320}
            h={160}
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              position: "relative", // Ensures delete button positioning works
              cursor: "pointer",
            }}
          >
            <Link href={`/internal/sidebar/project/${project.id}`} passHref legacyBehavior>
              <Group justify="space-between">
                <Stack gap={4} align="start">
                  <Group justify="space-between" w="100%">
                    <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                      {project.project_name}
                    </Text>
                  </Group>

                  <Text fw={500} mt={16} size="lg" style={{ color: "#ffffff" }}>
                    {project.project_leader}
                  </Text>

                  <Text fw={500} style={{ color: "#ffffff" }}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(project.total_cost || 0)}
                  </Text>
                </Stack>

                <Stack mt={-80}>
                  <ButtonDeleteWithConfirmation
                    id={project.id}
                    onDelete={handleDeleteProject}
                    description={`Apakah anda ingin menghapus proyek ${project?.project_name} ?`}
                  />
                </Stack>
              </Group>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectPage;

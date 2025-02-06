"use client";

import { Button, Card, Group, SimpleGrid, Text, Stack, ActionIcon } from "@mantine/core";

import AddProjectModal from "./AddProjectModal";
import { useQuery } from "@tanstack/react-query";
import { getDataProject } from "@/src/api/project/getDataProject";

import Link from "next/link";
import { useDeleteDataProject } from "@/src/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/src/components/button/buttonDeleteConfirmation";

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

  const { mutate: mutateDeleteDataProject, isPending: isLoadingDeleteLinmas } = useDeleteDataProject(refetchProjectData); // Use the custom hook

  const handleDeleteProject = (idToDelete: string) => {
    mutateDeleteDataProject(idToDelete); // Pass only the string, not an object
  };

  return (
    <>
      <Group justify="space-between">
        <Text fw={900} size="2rem">
          Daftar Project
        </Text>
        <AddProjectModal refetchProjectData={refetchProjectData} />
      </Group>

      <SimpleGrid mt={40} cols={4} spacing="lg">
        {projectData?.data.map((project) => (
          <Card
            key={project.id}
            w={320}
            h={200}
            style={{
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            {/* <Link href={`/internal/sidebar/project/${project.id}`} passHref style={{ textDecoration: "none" }}> */}
            <Stack gap={4} align="start">
              <Group justify="space-between" w="100%">
                <Link href={`/internal/sidebar/project/${project.id}`} passHref style={{ textDecoration: "none" }}>
                  <Text fw={900} size="xl" style={{ color: "#ffffff", cursor: "pointer" }}>
                    {project.project_name}
                  </Text>
                </Link>
                <Stack mt={-10}>
                  <ButtonDeleteWithConfirmation
                    id={project.id}
                    onDelete={handleDeleteProject}
                    description="Apakah Anda akan menghapus project ini?"
                  />
                </Stack>
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
            {/* </Link> */}
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectPage;

"use client";

import { Button, Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AddProjectModal from "./AddProjectModal";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getDataProject } from "@/api/project/getDataProject";
import { useDeleteDataProject } from "@/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/components/button/buttonDeleteConfirmation";

const ProjectPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)"); // Mobile
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1199px)"); // Tablet & Laptop Kecil
  const isWideScreen = useMediaQuery("(min-width: 1200px)"); // Layar Lebar

  const height = window.innerHeight;
  const width = window.innerWidth;

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
    mutateDeleteDataProject(idToDelete);
  };

  return (
    <>
      <Group justify="space-between" mb={20}>
        <Text fw={900} size="2rem">
          Daftar Project
        </Text>
        <Stack>
          <AddProjectModal refetchProjectData={refetchProjectData} />
        </Stack>
      </Group>

      <SimpleGrid mt={40} spacing="xl" p={20} cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isWideScreen ? 4 : 3}>
        {projectData?.data.map((project) => (
          <Card
            key={project.id}
            w={300} // Tetap konsisten di semua ukuran layar
            h={160}
            style={{
              maxWidth: 320,
              minWidth: 300,
              background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Link href={`/internal/sidebar/project/${project.id}`} passHref legacyBehavior>
              <Group justify="space-between">
                <Stack gap={4} align="start">
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    {project.project_name}
                  </Text>

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

                <ButtonDeleteWithConfirmation
                  id={project.id}
                  onDelete={handleDeleteProject}
                  description={`Apakah anda ingin menghapus proyek ${project?.project_name} ?`}
                />
              </Group>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProjectPage;

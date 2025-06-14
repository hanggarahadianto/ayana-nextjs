"use client";

import { Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getDataProject } from "@/api/project/getDataProject";
import { useDeleteDataProject } from "@/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { parseISO, differenceInDays, addDays } from "date-fns";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import AddProjectModal from "@/components/page/admin/project/AddProjectModal";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

const ProjectAdminComponent = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)"); // Mobile
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLaptopScreen = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)");
  const isWideScreen = useMediaQuery("(min-width: 1440px)");

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

  function getProjectStatusDateWithColor(projectStart: string, projectTime: string) {
    const startDate = parseISO(projectStart);
    const duration = parseInt(projectTime, 10);
    const plannedEndDate = addDays(startDate, duration);
    const today = new Date();

    const diffStartToNow = differenceInDays(today, startDate);
    const diffEndToNow = differenceInDays(today, plannedEndDate);

    if (diffStartToNow < 0) {
      return {
        text: `Belum mulai (mulai dalam ${Math.abs(diffStartToNow)} hari)`,
        color: "gray",
      };
    }

    if (diffEndToNow > 0) {
      return {
        text: `Terlambat ${diffEndToNow} hari`,
        sisaWaktu: null,
        color: "red",
      };
    }

    const sisaHari = Math.abs(diffEndToNow);
    return {
      text: `Berjalan ${diffStartToNow} hari`,
      sisaWaktu: `Sisa ${sisaHari} hari lagi`,
      color: "green",
    };
  }

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <Group justify="space-between" mb={20}>
          <Text fw={900} size="2rem">
            Daftar Project
          </Text>
          <Stack>
            <AddProjectModal refetchProjectData={refetchProjectData} />
          </Stack>
        </Group>
        <LoadingGlobal visible={isLoadingDeleteDataProject || isLoadingGetProjectData} />
        <SimpleGrid
          spacing="lg"
          cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLaptopScreen ? 3 : isWideScreen ? 5 : 5}
          style={{ gap: "24px" }}
        >
          {projectData?.data.map((project) => {
            const { text, sisaWaktu, color } = getProjectStatusDateWithColor(project.project_start, project.project_time);

            return (
              <Card
                key={project.id}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                  backdropFilter: "blur(8px)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Added transition
                  transform: "scale(1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Scale up on hover
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Link href={`/admin/sidebar/project/${project.id}`} passHref style={{ textDecoration: "none" }}>
                  <Stack>
                    <Stack align="start" gap="md">
                      <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                        {project.project_name}
                      </Text>

                      <Text mt={-12} fw={500} size="sm" style={{ color: "#ffffff" }}>
                        {project.project_leader}
                      </Text>

                      <Text mt={-12} fw={500} style={{ color: "#ffffff" }}>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(project.total_cost || 0)}
                      </Text>
                    </Stack>

                    <Stack>
                      <Text fw={200} size="sm" style={{ color: "#ffffff" }}>
                        {formatDateIndonesia(project.project_start)} - {formatDateIndonesia(project.project_end)}
                      </Text>

                      <Group justify="space-between" align="start" style={{ borderRadius: 8 }}>
                        <Stack gap={2} style={{ minHeight: 48 }}>
                          <Text fw={600} c={color}>
                            {text}
                          </Text>
                          <Text size="xs" fw={300} c="red" style={{ visibility: color === "green" ? "visible" : "hidden", marginTop: -4 }}>
                            {color === "green" ? sisaWaktu : "placeholder"}
                          </Text>
                        </Stack>

                        <ButtonDeleteWithConfirmation
                          id={project.id}
                          onDelete={handleDeleteProject}
                          description={`Apakah anda ingin menghapus proyek ${project?.project_name} ?`}
                          size={2.5}
                        />
                      </Group>
                    </Stack>
                  </Stack>
                </Link>
              </Card>
            );
          })}
        </SimpleGrid>
      </SimpleGridGlobal>
    </>
  );
};

export default ProjectAdminComponent;

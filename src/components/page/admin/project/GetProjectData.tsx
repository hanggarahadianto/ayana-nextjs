"use client";

import { Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getDataProject } from "@/api/project/getDataProject";
import { useDeleteDataProject } from "@/api/project/deleteDataProject";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatDateIndonesia, formatDateRange } from "@/helper/formatDateIndonesia";
import AddProjectModal from "@/components/page/admin/project/AddProjectModal";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import useScreenSize from "@/lib/hook/useScreenSize";
import { getProjectStatusDateWithColor } from "@/helper/formatStatusPorject";
import { useState } from "react";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";

interface ProjectAdminDataProps {
  companyId: string;
  companyName?: string;
}
const GetProjectAdminData = ({ companyId, companyName }: ProjectAdminDataProps) => {
  const { isSmallScreen, isMediumScreen, isLaptopScreen } = useScreenSize();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: projectData,
    isLoading: isLoadingGetProjectData,
    refetch: refetchProjectData,
  } = useQuery({
    queryKey: ["getProjectData", companyId, selectedCategory, page, limit, formattedStartDate, formattedEndDate, searchTerm],
    queryFn: () =>
      getDataProject({
        companyId,
        selectedCategory: selectedCategory ?? undefined,
        page,
        limit,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        searchTerm: searchTerm ?? undefined,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const projectList = projectData?.data.projectList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, projectData?.data.total || 0);

  const { mutate: mutateDeleteDataProject, isPending: isLoadingDeleteDataProject } = useDeleteDataProject(refetchProjectData);

  const handleDeleteProject = (idToDelete: string) => {
    mutateDeleteDataProject(idToDelete);
  };

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <Group justify="space-between" mb={20}>
          <Text fw={900} size="2rem">
            Daftar Project
          </Text>
          <SearchTable
            label={"Cari Data Transaksi"}
            companyId={companyId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            readonly={false}
            transactionType={null}
            debitAccountType={null}
            creditAccountType={"Revenue"}
            useCategory={true}
          />
          <Stack>
            <AddProjectModal refetchProjectData={refetchProjectData} companyId={companyId} />
          </Stack>
        </Group>
        <LoadingGlobal visible={isLoadingDeleteDataProject || isLoadingGetProjectData} />
        <SimpleGrid
          spacing="lg"
          cols={
            isSmallScreen ? 1 : isMediumScreen ? 2 : isLaptopScreen ? 3 : 5 // Default case for isWideScreen and any other case
          }
          style={{ gap: "24px" }}
        >
          {projectList.map((project) => {
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
        {!isLoadingGetProjectData && (
          <PaginationWithLimit
            total={projectData?.data.total ?? 0}
            page={page}
            limit={limit}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        )}
      </SimpleGridGlobal>
    </>
  );
};

export default GetProjectAdminData;

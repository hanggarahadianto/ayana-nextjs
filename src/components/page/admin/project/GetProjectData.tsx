"use client";

import { Card, Group, SimpleGrid, Text, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getDataProject } from "@/api/project/getDataProject";
import { useDeleteDataProject } from "@/api/project/deleteDataProject";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import AddProjectModal from "@/components/page/admin/project/AddProjectModal";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import useScreenSize from "@/lib/hook/useScreenSize";
import { useState } from "react";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import ProjectCardAdmin from "./ProjectCard";

interface ProjectAdminDataProps {
  companyId: string;
  companyName?: string;
}
const GetProjectAdminData = ({ companyId, companyName }: ProjectAdminDataProps) => {
  const { isSmallScreen, isMediumScreen, isLaptopScreen } = useScreenSize();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: projectData,
    isLoading: isLoadingGetProjectData,
    refetch: isRefetchProjectData,
    isFetching: isFetchingProjectData, // untuk setiap refetch
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

  const { mutate: mutateDeleteDataProject, isPending: isLoadingDeleteDataProject } = useDeleteDataProject(isRefetchProjectData);

  const handleDeleteProject = (idToDelete: string) => {
    mutateDeleteDataProject(idToDelete);
  };

  return (
    <>
      <SimpleGridGlobal cols={1}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text fw={900} size="2rem">
              Daftar Project {""} {companyName}
            </Text>
            <Stack>
              <AddProjectModal refetchProjectData={isRefetchProjectData} companyId={companyId} />
            </Stack>
          </Group>
          <Stack mt={40} mb={20}>
            <SearchTable
              label={"Cari Data Project"}
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
              creditAccountType={null}
              useCategory={false}
              onRefresh={isRefetchProjectData}
              isFetching={isFetchingProjectData}
            />
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder bg={"dark.8"} p={40} mt={20}>
          <LoadingGlobal visible={isLoadingDeleteDataProject || isLoadingGetProjectData} />
          <SimpleGrid
            spacing="lg"
            cols={
              isSmallScreen ? 1 : isMediumScreen ? 2 : isLaptopScreen ? 3 : 5 // Default case for isWideScreen and any other case
            }
            style={{ gap: "24px" }}
          >
            {projectList.map((project) => (
              <ProjectCardAdmin key={project.id} project={project} onDelete={handleDeleteProject} />
            ))}
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
        </Card>
      </SimpleGridGlobal>
    </>
  );
};

export default GetProjectAdminData;

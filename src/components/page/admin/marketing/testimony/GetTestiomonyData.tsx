"use client";

import { Card, Text, Stack, Group } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import { useModalStore } from "@/store/modalStore";
import AddTestimonyModal from "./AddTestimonyModal";
import { getDataTestimony } from "@/api/testimony/getDataTestiomony";
import { useDeleteTestimony } from "@/api/testimony/deleteTestimony";
import { TestimonyCardCarousel } from "./TestimonyCard";
import UpdateTestimonyModal from "./UpdateTestimonyModal";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import LoadingGlobal from "@/styles/loading/loading-global";

interface TestimonyTableProps {
  companyId: string;
  companyName?: string;
}

export const TestimonyTable = ({ companyId, companyName }: TestimonyTableProps) => {
  const { user } = useLoggedInUser();

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "created_at";

  const queryEnabled = !!user && !!companyId;

  const {
    data: testimonyData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getTestimonyData", companyId, debouncedSearch, formattedStartDate ?? null, formattedEndDate ?? null, sortBy, sortOrder],
    queryFn: () =>
      getDataTestimony({
        companyId,
        page: 1,
        limit: 9999, // ambil semua data, carousel yang handle chunk
        search: debouncedSearch,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortBy,
        sortOrder,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const testimonyList = testimonyData?.data?.testimonyList ?? [];

  const { mutate: mutateDeleteTestimony } = useDeleteTestimony(refetch);

  const handleDeleteTestimony = (id: string) => {
    mutateDeleteTestimony(id);
  };

  const openEditModal = (row: any) => {
    useModalStore.getState().openModal("editTestimony", row);
  };

  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            Daftar Testimony {companyName && `- ${companyName}`}
          </Text>
          <AddTestimonyModal companyId={companyId} />
        </Group>
      </Stack>

      {isLoading ? (
        <LoadingGlobal visible={isLoading} />
      ) : testimonyList.length === 0 ? (
        <Text c="dimmed" ta="center" mt="md">
          Testimony Tidak Tersedia
        </Text>
      ) : (
        <TestimonyCardCarousel testimonyList={testimonyList} openEditModal={openEditModal} onDelete={handleDeleteTestimony} />
      )}

      <UpdateTestimonyModal companyId={companyId} initialData={useModalStore((s) => s.modalData)} />
    </Card>
  );
};

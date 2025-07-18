"use client";

import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "@/utils/hook/useCookies";
import { useDebounce } from "use-debounce";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import { useModalStore } from "@/store/modalStore";

import AddTestimonyModal from "./AddTestimonyModal";
import TableComponent from "@/components/common/table/TableComponent";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import SearchTable from "@/components/common/table/SearchTableComponent";
import LoadingGlobal from "@/styles/loading/loading-global";
import { getDataTestimony } from "@/api/testimony/getDataTestiomony";
import { useDeleteTestimony } from "@/api/testimony/deleteTestimony";
import { columnsBaseTestimony } from "./TestimonyCustomerColumn";
import { TestimonyCardCarousel } from "./TestimonyCard";
import UpdateTestimonyModal from "./UpdateTestimonyModal";

interface TestimonyTableProps {
  companyId: string;
  companyName?: string;
}

export const TestimonyTable = ({ companyId, companyName }: TestimonyTableProps) => {
  const { getToken } = useCookies();
  const token = getToken();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "created_at";

  const queryEnabled = !!token && !!companyId;

  const {
    data: testimonyData,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      "getTestimonyData",
      companyId,
      page,
      limit,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getDataTestimony({
        companyId,
        page,
        limit,
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
  const totalTestimony = testimonyData?.data?.total ?? 0;
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalTestimony);

  const { mutate: mutateDeleteTestimony, isPending: isDeleting } = useDeleteTestimony(refetch);

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
      <TestimonyCardCarousel testimonyList={testimonyList} openEditModal={openEditModal} onDelete={handleDeleteTestimony} />
      <UpdateTestimonyModal companyId={companyId} initialData={useModalStore((s) => s.modalData)} />

      {!isLoading && (
        <PaginationWithLimit
          total={totalTestimony}
          page={page}
          limit={limit}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}
    </Card>
  );
};

import { Group, Pagination, Select, Stack, Text, Button } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

interface PaginationWithLimitProps {
  total: number;
  page: number;
  limit: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (newSortOrder: "asc" | "desc") => void;
}

const PaginationWithLimit = ({
  total,
  page,
  limit,
  startIndex,
  endIndex,
  onPageChange,
  onLimitChange,
  sortBy,
  sortOrder,
  onSortChange,
}: PaginationWithLimitProps) => {
  const totalPages = Math.ceil(total / limit);

  const toggleSort = () => {
    if (onSortChange) {
      onSortChange(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  if (totalPages <= 0) return null;

  return (
    <Group justify="space-between" mt="md">
      <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
        <Pagination total={totalPages} value={page} onChange={onPageChange} />
        <Text size="sm" c="dimmed">
          Menampilkan {startIndex} sampai {endIndex} dari {total} data
        </Text>
      </Stack>

      <Stack mt="40" style={{ paddingBottom: "16px" }}>
        <Group>
          <Stack>
            <Select
              value={String(limit)}
              onChange={(val) => val && onLimitChange(Number(val))}
              data={["10", "20", "30", "50", "100"]}
              w={160}
            />
            <Text size="sm" c="dimmed" mt={-8}>
              Tampilkan Halaman
            </Text>
          </Stack>
          {sortBy && onSortChange && (
            <Stack>
              <Select
                value={sortOrder}
                onChange={(val) => val && onSortChange?.(val as "asc" | "desc")}
                data={[
                  { label: "Terlama", value: "asc" },
                  { label: "Terbaru", value: "desc" },
                ]}
                w={160}
              />
              <Text size="sm" c="dimmed" mt={-8}>
                Urutkan Berdasarkan
              </Text>
            </Stack>
          )}
        </Group>
      </Stack>
    </Group>
  );
};

export default PaginationWithLimit;

import { Group, Pagination, Select, Stack, Text } from "@mantine/core";

interface PaginationWithLimitProps {
  total: number;
  page: number;
  limit: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PaginationWithLimit = ({ total, page, limit, startIndex, endIndex, onPageChange, onLimitChange }: PaginationWithLimitProps) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 0) return null;

  return (
    <Group justify="space-between" mt="md">
      <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
        <Pagination total={totalPages} value={page} onChange={onPageChange} />
        <Text size="sm" c="dimmed">
          Menampilkan {startIndex} sampai {endIndex} dari {total} data
        </Text>
      </Stack>
      <Stack style={{ paddingBottom: "16px" }} mt="40">
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
    </Group>
  );
};

export default PaginationWithLimit;

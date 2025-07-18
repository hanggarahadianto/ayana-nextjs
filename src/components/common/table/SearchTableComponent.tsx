import { ActionIcon, Group, TextInput, Tooltip } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconRefresh, IconX } from "@tabler/icons-react";
import { MdClose } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import SelectCategoryFilter from "../select/SelectCategoryFilter";

interface SearchTableProps {
  label: string;
  companyId: string;
  searchTerm?: string;
  setSearchTerm?: (value: string | undefined) => void;
  selectedCategory?: string | null;
  setSelectedCategory?: (value: string | null) => void;
  startDate?: Date | null;
  setStartDate?: (value: Date | null) => void;
  endDate?: Date | null;
  setEndDate?: (value: Date | null) => void;
  transactionType?: string | null;
  debitAccountType?: string | null;
  creditAccountType?: string | null;
  readonly?: boolean;
  useCategory?: boolean;
  onRefresh: () => void;
  isFetching?: boolean;
  useDateFilter?: boolean;
  useSearch?: boolean;
}

export default function SearchTable({
  label,
  companyId,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  transactionType,
  debitAccountType,
  creditAccountType,
  readonly = false,
  useCategory = false,
  onRefresh = () => {},
  isFetching = false,
  useDateFilter = true,
  useSearch = true,
}: SearchTableProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const clearDates = () => {
    if (setStartDate) setStartDate(null);
    if (setEndDate) setEndDate(null);
  };

  const clearSearch = () => {
    if (setSearchTerm) setSearchTerm(undefined);
  };

  return (
    <Group>
      {useCategory && (
        <SelectCategoryFilter
          companyId={companyId}
          value={selectedCategory ?? null}
          onChange={setSelectedCategory ?? (() => {})}
          readonly={readonly}
          transactionType={transactionType ?? null}
          debitAccountType={debitAccountType ?? null}
          creditAccountType={creditAccountType ?? null}
        />
      )}

      {useSearch && (
        <TextInput
          w={useCategory ? 400 : 800}
          label={label}
          placeholder="Cari data transaksi..."
          value={searchTerm ?? ""}
          onChange={(e) => setSearchTerm && setSearchTerm(e.currentTarget.value || undefined)}
          rightSection={
            searchTerm && (
              <ActionIcon onClick={clearSearch} variant="subtle" color="gray">
                <IconX size={16} />
              </ActionIcon>
            )
          }
        />
      )}
      {useDateFilter && (
        <Group wrap="wrap" gap="sm" align="end">
          <DatePickerInput
            label="Tanggal Awal"
            placeholder="Tanggal Awal"
            locale="id"
            clearable
            radius="sm"
            value={startDate}
            onChange={setStartDate}
            valueFormat="DD MMMM YYYY"
            rightSection={<IconCalendar size={18} />}
            w={isMobile ? 300 : 250}
          />
          <DatePickerInput
            label="Tanggal Akhir"
            placeholder="Tanggal Akhir"
            locale="id"
            clearable
            radius="sm"
            value={endDate}
            onChange={setEndDate}
            valueFormat="DD MMMM YYYY"
            rightSection={<IconCalendar size={18} />}
            w={isMobile ? 300 : 250}
          />

          <Tooltip label="Hapus Tanggal" withArrow>
            <ActionIcon onClick={clearDates} radius="xl" variant="default" size="lg" bg="orange.8">
              <MdClose size={24} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Refresh Data" withArrow>
            <ActionIcon variant="subtle" color="orange" onClick={onRefresh} size="lg" radius="xl" loading={isFetching} bg="teal">
              <IconRefresh size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </Group>
  );
}

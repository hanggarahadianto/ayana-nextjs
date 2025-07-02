// components/SearchTable.tsx
import { ActionIcon, Group, Stack, TextInput, Tooltip } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconRefresh, IconX } from "@tabler/icons-react";
import { MdClose } from "react-icons/md";
import SelectCategoryFilter from "../select/SelectCategoryFilter";
import { useMediaQuery } from "@mantine/hooks";

interface SearchTableProps {
  label: string;
  companyId: string;
  searchTerm?: string;
  setSearchTerm: (value: string | undefined) => void;
  selectedCategory?: string | null;
  setSelectedCategory: (value: string | null) => void;
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
  transactionType: string | null;
  debitAccountType: string | null;
  creditAccountType: string | null;
  readonly?: boolean;
  useCategory?: boolean;
  onRefresh: () => void;
  isFetching: boolean;
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
}: SearchTableProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const clearSearch = () => setSearchTerm(undefined);

  return (
    <Group>
      {useCategory && (
        <SelectCategoryFilter
          companyId={companyId}
          value={selectedCategory ?? null}
          onChange={setSelectedCategory}
          readonly={readonly}
          transactionType={transactionType}
          debitAccountType={debitAccountType}
          creditAccountType={creditAccountType}
        />
      )}

      <TextInput
        w={useCategory ? 400 : 800}
        label={label}
        placeholder="Cari data transaksi..."
        value={searchTerm ?? ""}
        onChange={(e) => setSearchTerm(e.currentTarget.value || undefined)}
        rightSection={
          searchTerm ? (
            <ActionIcon onClick={clearSearch} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          ) : null
        }
      />

      {isMobile ? (
        <Stack gap="sm">
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
            w={200}
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
            w={200}
          />
          <Stack>
            <Tooltip label="Hapus Tanggal" withArrow>
              <ActionIcon variant="subtle" color="gray" onClick={clearDates} size="lg" radius="xl">
                <MdClose size={24} />
              </ActionIcon>
            </Tooltip>
          </Stack>
        </Stack>
      ) : (
        <Group grow>
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
            w={440}
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
            w={440}
          />
          <Stack w={12}>
            <Group mt={22} gap={20}>
              <Tooltip label="Hapus Tanggal" withArrow>
                <ActionIcon
                  bg={"orange"}
                  onClick={clearDates}
                  radius="xl"
                  variant="default"
                  color="gray"
                  size={32}
                  styles={{
                    root: {
                      width: 32,
                      height: 32,
                      padding: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <MdClose size={24} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Refresh Data" withArrow bg={"teal"}>
                <ActionIcon variant="subtle" color="orange" onClick={onRefresh} size="lg" radius="xl" loading={isFetching} bg={"teal"}>
                  <IconRefresh size={24} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        </Group>
      )}
    </Group>
  );
}

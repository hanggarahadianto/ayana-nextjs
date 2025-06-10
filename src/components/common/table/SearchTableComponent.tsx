// components/SearchTable.tsx
import { ActionIcon, Group, Stack, TextInput, Tooltip } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconX } from "@tabler/icons-react";
import { MdClose } from "react-icons/md";
import SelectCategoryFilter from "../select/SelectCategoryFilter";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";

interface SearchTableProps {
  companyId: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
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
}

export default function SearchTable({
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
}: SearchTableProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // useEffect(() => {
  //   console.log("Received debitAccountType:", debitAccountType);
  // }, [debitAccountType]);

  return (
    <Group>
      <SelectCategoryFilter
        companyId={companyId}
        value={selectedCategory ?? null}
        onChange={setSelectedCategory}
        readonly={readonly}
        transactionType={transactionType}
        debitAccountType={debitAccountType}
        creditAccountType={creditAccountType}
      />

      <TextInput
        w={400}
        label="Cari Data Asset"
        placeholder="Cari data asset..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        rightSection={
          searchTerm ? (
            <ActionIcon onClick={() => setSearchTerm("")} variant="subtle" color="gray">
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
            w={"200"}
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
            w={"200"}
          />
          <Tooltip label="Hapus Tanggal" withArrow>
            <ActionIcon variant="subtle" color="gray" onClick={clearDates} size="lg" radius="xl">
              <MdClose size={24} />
            </ActionIcon>
          </Tooltip>
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
            w={"240"}
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
            w={"240"}
          />
          <Tooltip label="Hapus Tanggal" withArrow>
            <ActionIcon variant="subtle" color="slate" onClick={clearDates} radius="xl" mt={24} maw={16}>
              <MdClose size={24} width={11} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </Group>
  );
}

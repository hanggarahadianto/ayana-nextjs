"use client";

import React from "react";
import { Button, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useDownloadJournalTransaction } from "@/api/finance/downloadExcelJournalTransaction";

interface DownloadJournalButtonProps {
  entries: IJournalEntryItem[];
  title: string;
  startDate: string;
  endDate: string;
  selectedCategory?: string;
  searchTerm?: string;
}

const DownloadJournalButton = ({ entries, title, startDate, endDate, selectedCategory, searchTerm }: DownloadJournalButtonProps) => {
  const { mutate, isPending } = useDownloadJournalTransaction();

  return (
    <Tooltip label="Unduh Transaksi Jurnal" position="top" withArrow color="blue">
      <Button
        onClick={() =>
          mutate({
            entries,
            title,
            startDate,
            endDate,
            selectedCategory,
            searchTerm,
          })
        }
        leftSection={<IconDownload size={16} />}
        variant="light"
        color="blue"
        radius="md"
        loading={isPending}
      >
        Download
      </Button>
    </Tooltip>
  );
};

export default DownloadJournalButton;

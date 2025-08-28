import { Group, Badge } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";
import BreathingActionIcon from "@/components/common/button/ButtonActionGo";

export const columnsBaseTestimony = (openEditModal: (row: any) => void, handleDelete: (id: string) => void) => [
  {
    key: "note",
    title: "Catatan",
    width: 280,
    minWidth: 280,
    render: (row: any) => row.note || "-",
  },
  {
    key: "rating",
    title: "Rating",
    width: 80,
    minWidth: 80,
    render: (row: any) => (
      <Badge color="yellow" variant="filled">
        {row.rating ?? "-"}
      </Badge>
    ),
  },
  {
    key: "home.title",
    title: "Produk",
    width: 180,
    minWidth: 180,
    render: (row: any) => row.home?.title ?? "-",
  },
  {
    key: "created_at",
    title: "Tanggal Input",
    width: 160,
    minWidth: 160,
    render: (row: any) => formatDateIndonesia(row.created_at),
  },
  {
    key: "aksi",
    title: "Aksi",
    width: 100,
    minWidth: 100,
    render: (row: any) => (
      <Group gap="lg">
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="1rem" />} size="2.2rem" />
        <ButtonDeleteWithConfirmation
          isLoading={false}
          onDelete={() => handleDelete(row.id)}
          description={`Hapus testimony ini?`}
          size={2.2}
        />
      </Group>
    ),
  },
];

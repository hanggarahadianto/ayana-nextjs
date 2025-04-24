// src/components/common/StatsGrid.tsx
import { IconArrowDownRight, IconArrowUpRight, IconCoin, IconDiscount2, IconReceipt2, IconUserPlus } from "@tabler/icons-react";
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { formatCurrency } from "@/utils/formatCurrency";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export type StatItem = {
  title: string;
  icon: keyof typeof icons;
  value: string | number;
  diff: number;
};

type StatsGridProps = {
  data: StatItem[];
};

export const StatsGrid = ({ data }: StatsGridProps) => {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    // console.log("DATA", data);

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} style={{ padding: "calc(var(--mantine-spacing-xl) * 1.5)" }} w={400}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" style={{ fontWeight: 700, textTransform: "uppercase" }}>
            {stat.title}
          </Text>
          {/* <Icon size={22} stroke={1.5} style={{ color: "light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3))" }} /> */}
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1 }}>{formatCurrency(Number(stat.value))}</Text>
          {/* <Text c={stat.diff > 0 ? "teal" : "red"} fz="sm" fw={500} style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>
            <span>{stat.diff}%</span>
            <DiffIcon size={16} stroke={1.5} />
          </Text> */}
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <div style={{ padding: "calc(var(--mantine-spacing-xl) * 1.5)" }}>
      <SimpleGrid>{stats}</SimpleGrid>
      {/* <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid> */}
    </div>
  );
};

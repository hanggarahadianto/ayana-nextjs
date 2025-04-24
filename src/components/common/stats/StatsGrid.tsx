"use client";

import { IconArrowDownRight, IconArrowUpRight, IconCoin, IconDiscount2, IconReceipt2, IconUserPlus } from "@tabler/icons-react";
import { Group, Paper, Text } from "@mantine/core";
import { formatCurrency } from "@/utils/formatCurrency";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

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
  color: string;
  diff: number;
};

type StatsGridProps = {
  data: StatItem[];
};

export const StatsGrid = ({ data }: StatsGridProps) => {
  const stats = data.map((stat, index) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <div key={index}>
        <Text size="xs" c="dimmed" style={{ fontWeight: 700, textTransform: "uppercase" }} w={200}>
          {stat.title}
        </Text>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text c={stat.color} style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1 }}>
            {formatCurrency(Number(stat.value))}
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7} w={200}>
          Compared to previous month
        </Text>
      </div>
    );
  });

  return (
    <div style={{ padding: "calc(var(--mantine-spacing-xl) * 1.5)" }}>
      {/* Pass total number of items (data.length) to SimpleGridGlobal */}
      <SimpleGridGlobal>{stats}</SimpleGridGlobal>
    </div>
  );
};

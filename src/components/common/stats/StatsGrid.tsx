"use client";

import { IconArrowDownRight, IconArrowUpRight, IconCoin, IconDiscount2, IconHome, IconReceipt2, IconUserPlus } from "@tabler/icons-react";
import { Flex, Group, Paper, Text } from "@mantine/core";
import { formatCurrency } from "@/utils/formatCurrency";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

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

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
  home: IconHome, // <-- tambahkan ini
};

export const StatsGrid = ({ data }: StatsGridProps) => {
  const stats = data.map((stat, index) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <div key={index} style={{ marginBottom: "20px" }}>
        {/* Icon */}
        <Flex p="center" w={400}>
          <Icon size={40} color={stat.color} />
          <Group
            w="100%"
            justify="space-between"
            align="center"
            style={{ padding: "10px 15px", borderRadius: "8px", marginBottom: "15px" }}
          >
            <Text mt={4} size="xs" c="dimmed" style={{ fontWeight: 700, textTransform: "uppercase" }}>
              {stat.title}
            </Text>
          </Group>
        </Flex>

        {/* Title */}

        {/* Value */}
        <Group p="center" align="center" gap="xs" style={{ marginBottom: "10px" }}>
          <Text
            c={Number(stat.value) < 0 ? "red.7" : stat.color}
            style={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {formatCurrency(Number(stat.value))}
          </Text>
        </Group>

        {/* Comparison Text */}
        <Group w={200}>
          <Text fz="xs" c="dimmed" style={{ marginTop: "5px" }}>
            Compared to previous month
          </Text>
        </Group>
      </div>
    );
  });

  return (
    <div>
      {/* <div style={{ padding: "calc(var(--mantine-spacing-xl) * 1.5)" }}> */}
      {/* Pass total number of items (data.length) to SimpleGridGlobal */}
      <SimpleGridGlobal w={400}>{stats}</SimpleGridGlobal>
    </div>
  );
};

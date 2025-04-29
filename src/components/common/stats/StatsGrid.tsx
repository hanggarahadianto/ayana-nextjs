"use client";

import { IconArrowDownRight, IconArrowUpRight, IconCoin, IconDiscount2, IconHome, IconReceipt2, IconUserPlus } from "@tabler/icons-react";
import { Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { formatCurrency } from "@/utils/formatCurrency";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";

export type StatItem = {
  title: string;
  icon: keyof typeof icons;
  value: string | number;
  color: string;
  diff: number;
  loading: any;
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

    return (
      <div key={index}>
        <SimpleGridGlobal cols={1} p={10}>
          <LoadingGlobal visible={stat.loading} />
          <Flex w="100%">
            <Icon size={40} color={stat.color} />
            <Group>
              <Text mt={4} size="xs" c="dimmed" style={{ fontWeight: 700, textTransform: "uppercase" }}>
                {stat.title}
              </Text>
            </Group>
          </Flex>

          {/* Title */}

          {/* Value */}
          <Group gap="xs" mt={40}>
            <Text
              c={Number(stat.value) < 0 ? "red.7" : stat.color}
              style={{
                fontSize: "24px",
                fontWeight: 700,
                // lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              {formatCurrency(Number(stat.value))}
            </Text>
          </Group>

          {/* Comparison Text */}
          <Group>
            <Text fz="xs" c="dimmed" w="100%">
              Compared to previous month
            </Text>
          </Group>
        </SimpleGridGlobal>
      </div>
    );
  });

  return (
    <div>
      {/* <div style={{ padding: "calc(var(--mantine-spacing-xl) * 1.5)" }}> */}
      {/* Pass total number of items (data.length) to SimpleGridGlobal */}
      <Stack>{stats}</Stack>
    </div>
  );
};

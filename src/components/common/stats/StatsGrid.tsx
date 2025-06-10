"use client";

import { IconArrowDownRight, IconArrowUpRight, IconCoin, IconDiscount2, IconHome, IconReceipt2, IconUserPlus } from "@tabler/icons-react";
import { Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { formatCurrency } from "@/helper/formatCurrency";
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
  home: IconHome,
};

export const StatsGrid = ({ data }: StatsGridProps) => {
  const stats = data.map((stat, index) => {
    const Icon = icons[stat.icon];

    return (
      <div key={index}>
        <SimpleGridGlobal cols={1} p={10}>
          <LoadingGlobal visible={stat.loading} />
          <Flex w="100%" gap={20}>
            <Icon size={40} color={stat.color} />
            <Group>
              <Text
                mt={4}
                c="dimmed"
                style={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(0.8rem, 1.2vw, 0.8rem)", // responsif dari kecil ke sedang
                }}
              >
                {stat.title}
              </Text>
            </Group>
          </Flex>

          <Group gap="xs" mt={12}>
            <Text
              c={Number(stat.value) < 0 ? "red.7" : stat.color}
              style={{
                fontSize: "clamp(1.1rem, 1.9vw, 1.6rem)", // responsif dari sedang ke besar
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {formatCurrency(Number(stat.value))}
            </Text>
          </Group>

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
      <Stack>{stats}</Stack>
    </div>
  );
};

// components/ProgressBar.tsx
"use client";

import { Card, Progress, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Stack justify="center" align="center">
      <Card
        shadow="md"
        radius="lg"
        p="xs"
        withBorder
        style={{
          maxWidth: "960px",
          width: "90vw",
          border: "1px solid rgba(0, 155, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Stack gap="lg" align="center">
          <Text size="xl" fw={900} c="cyan.8">
            Progress Proyek
          </Text>

          <Progress.Root
            size={40}
            w="100%"
            radius="md"
            style={{
              overflow: "visible",
              border: "1px solid rgba(0, 155, 255, 0.1)",
            }}
          >
            <Tooltip label={`Progress Proyek: ${progress ?? 0}%`} color="blue.6" position="top" offset={20} withArrow>
              <Progress.Section
                value={progress ?? 1}
                color="blue"
                style={{
                  background: "linear-gradient(45deg, #00b7ff 0%, #005eff 100%)",
                  transition: "width 0.6s ease-in-out",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <Progress.Label
                  style={{
                    color: "white",
                    fontWeight: 600,
                    padding: "0 16px",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                    position: "absolute",
                    right: "8px",
                    transform: "translateX(0)",
                  }}
                >
                  {progress ?? 0}%
                </Progress.Label>
              </Progress.Section>
            </Tooltip>
          </Progress.Root>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ProgressBar;

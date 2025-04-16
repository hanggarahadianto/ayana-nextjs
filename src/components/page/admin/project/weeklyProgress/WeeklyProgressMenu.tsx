import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { Card, Grid, Group, RingProgress, SimpleGrid, Stack, Text } from "@mantine/core";
import AddWeeklyProgressModal from "./AddWeeklyProgressModal";
import { formatCurrency } from "@/utils/formatRupiah";
import { useDeleteDataWeeklyProgress } from "@/api/weekly-progress/deleteDataWeeklyProgress";
import EditWeeklyProgressModal from "./EditWeeklyProgressModal";
import { useState } from "react";

const WeeklyProgressMenu = ({ refetchWeeklyProgressData, projectDataDetail, weeklyProgressData }) => {
  const [selectedProgress, setSelectedProgress] = useState<IWeeklyProgress | null>(null);

  const { mutate: deleteWeeklyProgress } = useDeleteDataWeeklyProgress(refetchWeeklyProgressData);

  const handleCardClick = (progress: IWeeklyProgress) => {
    setSelectedProgress(progress);
  };

  const handleDeleteWeeklyProgress = (idToDelete: string) => {
    deleteWeeklyProgress(idToDelete);
  };

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Text fw={700} size="1.5rem">
          Progress Mingguan
        </Text>
        <AddWeeklyProgressModal
          refetchWeeklyProgressData={refetchWeeklyProgressData}
          projectId={projectDataDetail?.id}
          weeklyProgress={weeklyProgressData?.data ?? []}
        />
      </Group>

      <SimpleGrid mt={20} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {weeklyProgressData?.data
          .sort((a: IWeeklyProgress, b: IWeeklyProgress) => {
            // Convert week_number from string to number for proper comparison
            const weekNumberA = parseInt(a.week_number, 10);
            const weekNumberB = parseInt(b.week_number, 10);
            return weekNumberA - weekNumberB; // Sort in ascending order
          })
          .map((weeklyProgress: IWeeklyProgress) => {
            console.log("urutan", weeklyProgress.week_number);
            return (
              <Card
                key={weeklyProgress.id}
                withBorder
                shadow="md"
                radius="lg"
                p="lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 150, 0.4), rgba(0, 204, 255, 0.4))",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(weeklyProgress)}
              >
                <Stack gap="sm">
                  <Group>
                    <Text fw={900} size="lg" c="white">
                      Minggu Ke {weeklyProgress.week_number}
                    </Text>

                    <RingProgress
                      size={80}
                      thickness={8}
                      sections={[{ value: Number(weeklyProgress.percentage), color: "green" }]}
                      label={
                        <Text c="blue" fw={700} ta="center" size="xs">
                          {weeklyProgress.percentage}%
                        </Text>
                      }
                    />
                  </Group>

                  <Grid mt="md">
                    <Grid.Col span={6}>
                      <Text size="sm" c="white">
                        Biaya Material
                      </Text>
                      <Text size="sm" c="white">
                        Biaya Pekerja
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="sm" c="white">
                        {formatCurrency(weeklyProgress.amount_material)}
                      </Text>
                      <Text size="sm" c="white">
                        {formatCurrency(weeklyProgress.amount_worker)}
                      </Text>
                    </Grid.Col>
                  </Grid>

                  <Group mt="md" justify="flex-end" align="flex-end">
                    <EditWeeklyProgressModal
                      projectId={projectDataDetail?.id}
                      refetchWeeklyProgressData={refetchWeeklyProgressData}
                      initialData={selectedProgress || undefined}
                    />

                    <ButtonDeleteWithConfirmation
                      id={weeklyProgress.id}
                      onDelete={handleDeleteWeeklyProgress}
                      description={`Apakah anda yakin ingin menghapus progress minggu ke ${weeklyProgress.week_number} ?`}
                      size={2.5}
                    />
                  </Group>
                </Stack>
              </Card>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export default WeeklyProgressMenu;

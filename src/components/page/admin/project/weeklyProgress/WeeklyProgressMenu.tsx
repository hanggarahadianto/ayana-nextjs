import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { Card, Grid, Group, RingProgress, SimpleGrid, Stack, Text } from "@mantine/core";
import AddWeeklyProgressModal from "./AddWeeklyProgressModal";
import { useDeleteDataWeeklyProgress } from "@/api/weekly-progress/deleteDataWeeklyProgress";
import EditWeeklyProgressModal from "./EditWeeklyProgressModal";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { formatCurrency } from "@/helper/formatCurrency";

const WeeklyProgressMenu = ({ refetchWeeklyProgressData, projectDataDetail, weeklyProgressData }) => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)"); // Mobile
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)"); // Tablet
  const isLaptopScreen = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)"); // Laptop 12-14 inch
  const isWideScreen = useMediaQuery("(min-width: 1440px)"); // Laptop 15 inch ke atas

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

      {/* <SimpleGrid mt={20} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg"> */}
      <SimpleGrid
        spacing="lg"
        p={20}
        cols={isSmallScreen ? 1 : isMediumScreen ? 2 : isLaptopScreen ? 4 : isWideScreen ? 6 : 6}
        style={{ gap: "24px" }}
      >
        {weeklyProgressData?.data
          .sort((a: IWeeklyProgress, b: IWeeklyProgress) => {
            // Convert week_number from string to number for proper comparison
            const weekNumberA = parseInt(a.week_number, 10);
            const weekNumberB = parseInt(b.week_number, 10);
            return weekNumberA - weekNumberB; // Sort in ascending order
          })
          .map((weeklyProgress: IWeeklyProgress) => {
            return (
              <Card
                key={weeklyProgress.id}
                withBorder
                shadow="md"
                radius="lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 150, 0.4), rgba(0, 204, 255, 0.4))",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  cursor: "pointer",
                  maxWidth: "80x",
                  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Added transition
                  transform: "scale(1)", // Initial scale value
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Scale up on hover
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleCardClick(weeklyProgress)}
              >
                <Stack gap="sm" style={{ height: "100%" }}>
                  <Group>
                    <Text fw={900} size="lg" c="white">
                      Minggu {weeklyProgress.week_number}
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
                    <Grid.Col span={4}>
                      <Text size="sm" c="white">
                        Material
                      </Text>
                      <Text size="sm" c="white">
                        Pekerja
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
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
                      isLoading={false}
                      onDelete={() => handleDeleteWeeklyProgress(weeklyProgress.id)}
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

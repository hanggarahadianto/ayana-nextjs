import ButtonDeleteWithConfirmation from "@/components/button/buttonDeleteConfirmation";
import { Card, Grid, Group, RingProgress, SimpleGrid, Stack, Text } from "@mantine/core";
import AddWeeklyProgressModal from "./AddWeeklyProgressModal";

const WeeklyProgressMenu = ({
  refetchWeeklyProgressData,
  projectDataDetail,
  weeklyProgressData,
  handleCardClick,
  handleDeleteWeeklyProgress,
}) => {
  return (
    <>
      <Group justify="space-between">
        <Text fw={700} size="1.5rem">
          Progress Mingguan
        </Text>
        <AddWeeklyProgressModal
          refetchWeeklyProgressData={refetchWeeklyProgressData}
          projectId={projectDataDetail?.id}
          weeklyProgress={weeklyProgressData?.data ?? []}
        />
      </Group>

      <SimpleGrid mt={40} cols={4} spacing="lg">
        {weeklyProgressData?.data.map((weeklyProgress: IWeeklyProgress) => {
          return (
            <Card
              key={weeklyProgress.id}
              style={{
                background: "linear-gradient(135deg, rgba(255, 0, 150, 0.5), rgba(0, 204, 255, 0.5))",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                cursor: "pointer",
                minWidth: "380px",
                maxWidth: "82vw",
                width: "100%",
              }}
            >
              <Stack gap={4} onClick={() => handleCardClick(weeklyProgress)}>
                <Group justify="space-between">
                  <Text fw={900} size="xl" style={{ color: "#ffffff" }}>
                    Minggu Ke {weeklyProgress.week_number}
                  </Text>

                  <RingProgress
                    size={100}
                    sections={[{ value: Number(weeklyProgress.percentage), color: "green" }]}
                    label={
                      <Text c="blue" fw={700} ta="center" size="xs">
                        {weeklyProgress.percentage}%
                      </Text>
                    }
                  />
                </Group>
                <Grid w={400} mt={22}>
                  <Grid.Col span={5}>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      Biaya Material
                    </Text>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      Jumlah Pekerja
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Text fw={500} style={{ color: "#ffffff" }}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(weeklyProgress.amount_material || 0)}
                    </Text>
                    <Text fw={500} size="lg" style={{ color: "#ffffff" }}>
                      {weeklyProgress.amount_worker} Orang
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
              <Stack align="flex-end">
                <ButtonDeleteWithConfirmation
                  id={weeklyProgress?.id}
                  onDelete={handleDeleteWeeklyProgress}
                  description={`Apakah anda yakin ingin menghapus progress minggu ke ${weeklyProgress?.week_number} ?`}
                  size={2.5}
                />
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default WeeklyProgressMenu;

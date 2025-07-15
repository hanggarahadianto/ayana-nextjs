import { Box, Group, Paper, Progress, Stack, Text, Title } from "@mantine/core";

const PerformerSection = ({ title, data, color }: { title: string; data: PerformerResponse[]; color: string }) => {
  const maxBooking = data.length > 0 ? Math.max(...data.map((p) => p.total_booking)) : 1;

  return (
    <Box>
      <Title order={4} mb="md">
        {title}
      </Title>
      <Stack>
        {data.map((person) => (
          <Paper key={person.id} shadow="xs" p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Box>
                <Text fw={500}>{person.name}</Text>
                <Text size="sm" c="dimmed">
                  Booking: {person.total_booking} • Amount: Rp{person.total_amount.toLocaleString("id-ID")}
                </Text>
              </Box>
              <Box w="60%">
                <Progress value={(person.total_booking / maxBooking) * 100} radius="xl" color={color} />
              </Box>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default PerformerSection;

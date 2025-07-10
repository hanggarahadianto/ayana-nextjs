import { Card, Text, Stack, Group, Badge, Skeleton, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCookies } from "@/utils/hook/useCookies";
import { getDataPresenceRule } from "@/api/employee/getPresenceRule";
import { Carousel } from "@mantine/carousel";
import { IconCalendarOff, IconClockHour7 } from "@tabler/icons-react";
import { dayDictionary } from "@/constants/dictionary";
import CreatePresenceRuleModal from "./AddPresenceRuleModal";
import { useMediaQuery } from "@mantine/hooks";

interface PresenceRuleTableProps {
  companyId: string;
  companyName?: string;
}

export const PresenceRuleTable = ({ companyId, companyName }: PresenceRuleTableProps) => {
  const { getToken } = useCookies();
  const token = getToken();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryEnabled = !!token && !!companyId;
  const { data: presenceRuleData, isLoading: isLoadingPresenceRuleData } = useQuery({
    queryKey: ["getPresenceRuleData", companyId, page, limit],
    queryFn: () =>
      getDataPresenceRule({
        companyId: companyId!,
        page,
        limit,
      }),
    enabled: queryEnabled,
    refetchOnWindowFocus: false,
  });

  const presenceRuleList = presenceRuleData?.presenceRules ?? [];

  const isSmall = useMediaQuery("(max-width: 36em)");
  const isMedium = useMediaQuery("(max-width: 48em)");
  const slideSize = isSmall ? "100%" : isMedium ? "50%" : "25%";

  return (
    <Box mt="md" bg={"red"} p={"20"} h={"600px"}>
      <Group justify="space-between">
        <Text fw={600} size="lg" mb="sm">
          Aturan Presensi {companyName && `– ${companyName}`}
        </Text>
        <CreatePresenceRuleModal companyId={companyId} />
      </Group>

      <Carousel slideGap="xs" align="start" withControls withIndicators loop height={500} slideSize={slideSize}>
        {presenceRuleList.map((rule) => (
          <Carousel.Slide key={rule?.id || `${rule.day}-${rule.start_time}`} p={"50px"}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              padding="md"
              style={{
                minHeight: 380,
                maxWidth: 390,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Group justify="space-between" align="center" mb="xs">
                <Text fw={600}>{dayDictionary.find((d) => d.value.toLowerCase() === rule.day.toLowerCase())?.label || rule.day}</Text>

                <Badge color={rule.is_holiday ? "red" : "green"} variant="light">
                  {rule.is_holiday ? "Libur" : "Hari Kerja"}
                </Badge>
              </Group>

              {!rule.is_holiday ? (
                <Stack>
                  {/* Card Masuk */}
                  <Card withBorder shadow="xs" radius="md" p="md" w="100%">
                    <Stack>
                      <Group>
                        <IconClockHour7 size={20} color="teal" />
                        <Text size="sm" fw={500}>
                          Waktu Masuk: <strong>{rule.start_time}</strong>
                        </Text>
                      </Group>

                      {rule.arrival_tolerances?.length > 0 ? (
                        rule.arrival_tolerances.map((t: number, i: number) => (
                          <Text size="sm" key={`arrival-${rule.id}-${t}-${i}`}>
                            • Toleransi Datang {i + 1}: {t} menit
                          </Text>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">
                          Tidak ada toleransi datang
                        </Text>
                      )}
                    </Stack>
                  </Card>

                  {/* Card Pulang */}
                  <Card withBorder shadow="xs" radius="md" p="md" w="100%">
                    <Stack gap="xs">
                      <Group>
                        <IconClockHour7 size={20} color="teal" />
                        <Text size="sm" fw={500}>
                          Waktu Pulang: <strong>{rule.end_time}</strong>
                        </Text>
                      </Group>

                      {rule.departure_tolerances?.length > 0 ? (
                        rule.departure_tolerances.map((t: number, i: number) => (
                          <Text size="sm" key={`departure-${rule.id}-${t}-${i}`}>
                            • Toleransi Pulang {i + 1}: {t} menit
                          </Text>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">
                          Tidak ada toleransi pulang
                        </Text>
                      )}
                    </Stack>
                  </Card>

                  <Text size="sm" mt="xs">
                    Grace Period: <strong>{rule.grace_period_mins}</strong> menit
                  </Text>
                </Stack>
              ) : (
                <Group mt="sm">
                  <IconCalendarOff size={18} />
                  <Text size="sm" c="dimmed">
                    Tidak ada jam kerja pada hari ini
                  </Text>
                </Group>
              )}
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

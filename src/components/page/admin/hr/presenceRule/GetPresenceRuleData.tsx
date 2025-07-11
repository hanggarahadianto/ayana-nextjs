import { Card, Text, Stack, Group, Badge, Box, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCookies } from "@/utils/hook/useCookies";
import { getDataPresenceRule } from "@/api/employee/getPresenceRule";
import { Carousel } from "@mantine/carousel";
import { IconCalendarOff, IconClockHour7 } from "@tabler/icons-react";
import { dayDictionary } from "@/constants/dictionary";
import CreatePresenceRuleModal from "./AddPresenceRuleModal";
import { useResponsiveLayout } from "@/styles/resposnsiveLayout/resposnvieLayout";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";

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

  const presenceRuleListRaw = presenceRuleData?.presenceRules ?? [];

  const dayOrder = dayDictionary.map((d) => d.value.toLowerCase());

  const presenceRuleList = [...presenceRuleListRaw].sort((a, b) => {
    const dayA = a.day.toLowerCase();
    const dayB = b.day.toLowerCase();
    return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
  });

  const { isMobile, isTablet, isLaptop } = useResponsiveLayout();

  const slideSize = isMobile ? "100%" : isTablet ? "1%" : "10%";

  return (
    <Box mt="md" p="md">
      <Group justify="space-between" mb="md">
        <Text fw={600} size="lg">
          Aturan Presensi {companyName && ` ${companyName}`}
        </Text>
        <CreatePresenceRuleModal companyId={companyId} />
      </Group>

      <Carousel
        align="start"
        withControls
        withIndicators
        loop
        w={"100%"}
        height={isMobile ? 400 : isTablet ? 420 : 400}
        slideSize={slideSize}
        slideGap="md"
        p={"60px"}
      >
        {presenceRuleList.map((rule: IPresenceRuleItem) => (
          <Carousel.Slide key={rule?.id || `${rule.day}-${rule.start_time}`}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              padding="md"
              style={{
                height: "100%",
                width: isMobile ? 400 : isTablet ? 800 : 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Group justify="space-between" align="center" mb="xs">
                <Flex gap={"12px"}>
                  <Text size="xl" fw={600}>
                    {dayDictionary.find((d) => d.value.toLowerCase() === rule.day.toLowerCase())?.label || rule.day}
                  </Text>

                  <Badge color={rule.is_holiday ? "red" : "green"} variant="light" mt={8}>
                    {rule.is_holiday ? "Libur" : "Hari Kerja"}
                  </Badge>
                </Flex>
                <ButtonDeleteWithConfirmation
                  id={""}
                  onDelete={function (id: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  description={""}
                  size={2.2}
                />
              </Group>

              {!rule.is_holiday ? (
                <Stack>
                  <Card withBorder shadow="xs" radius="md" p="md">
                    <Stack gap={4}>
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

                  <Card withBorder shadow="xs" radius="md" p="md">
                    <Stack gap={4}>
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

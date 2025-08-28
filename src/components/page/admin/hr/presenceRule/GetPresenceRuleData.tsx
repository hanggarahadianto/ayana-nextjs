import { Card, Text, Stack, Group, Badge, Box, Flex } from "@mantine/core";
import { useCallback } from "react";
import { Carousel } from "@mantine/carousel";
import { IconCalendarOff, IconClockHour7, IconPencil } from "@tabler/icons-react";
import { dayDictionary } from "@/constants/dictionary";
import CreatePresenceRuleModal from "./AddPresenceRuleModal";
import { useResponsiveLayout } from "@/styles/resposnsiveLayout/resposnvieLayout";
import { useDeleteDataPresenceRule } from "@/api/employee/deletePresenceRule";
import UpdatePresenceRuleModal from "./UpdatePresenceRuleModal";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { useModalStore } from "@/store/modalStore";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";

interface PresenceRuleTableProps {
  companyId: string;
  companyName?: string;
  presenceRuleList: IPresenceRuleItem[];
  refetchPresenceRule: () => void;
}

export const PresenceRuleTable = ({ companyId, companyName, presenceRuleList, refetchPresenceRule }: PresenceRuleTableProps) => {
  const { mutate: mutateDeleteDataPresenceRule } = useDeleteDataPresenceRule(refetchPresenceRule);

  const handleDeletePresenceRule = useCallback(
    (idToDelete: string) => {
      mutateDeleteDataPresenceRule(idToDelete);
    },
    [mutateDeleteDataPresenceRule]
  );

  const { isMobile, isTablet } = useResponsiveLayout();
  const slideSize = isMobile ? "100%" : isTablet ? "1%" : "10%";

  const openEditModal = useCallback((data: IPresenceRuleItem) => {
    useModalStore.getState().openModal("editPresenceRule", data);
  }, []);

  return (
    <Box mt="md" p="md">
      <Group justify="space-between" mb="md">
        <Text fw={600} size="lg">
          Aturan Presensi {companyName && ` ${companyName}`}
        </Text>
        <CreatePresenceRuleModal companyId={companyId} />
      </Group>

      {presenceRuleList.length === 0 ? (
        <Card
          withBorder
          shadow="sm"
          radius="md"
          py="xl"
          px="md"
          h={300}
          w="100%"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            borderStyle: "dashed",
            borderColor: "#ced4da",
            borderWidth: 2,
            backgroundColor: "#f8f9fa",
          }}
        >
          <IconCalendarOff size={64} stroke={1.5} color="#868e96" />
          <Text mt="md" fw={500} size="lg" c="dimmed">
            Aturan Jam Kerja Belum Tersedia
          </Text>
          <Text size="sm" c="dimmed">
            Silakan tambahkan aturan jam kerja terlebih dahulu
          </Text>
        </Card>
      ) : (
        <Carousel
          align="start"
          withControls
          withIndicators
          loop
          w="100%"
          height={isMobile ? 400 : isTablet ? 420 : 400}
          slideSize={slideSize}
          slideGap="md"
          p="60px"
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
                  <Stack>
                    <BreathingActionIcon onClick={() => openEditModal(rule)} icon={<IconPencil size="2rem" />} size="2.2rem" />

                    <UpdatePresenceRuleModal />
                  </Stack>
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

                    <Group justify="space-between">
                      <Flex>
                        <Text size="sm" mt="xs">
                          Grace Period: <strong>{rule.grace_period_mins}</strong> menit
                        </Text>
                      </Flex>

                      <ButtonDeleteWithConfirmation
                        isLoading={false}
                        onDelete={() => handleDeletePresenceRule(rule.id)}
                        description={""}
                        size={2.2}
                      />
                    </Group>
                  </Stack>
                ) : (
                  <Group mt="sm">
                    <Group>
                      <IconCalendarOff size={18} />
                      <Text size="sm" c="dimmed">
                        Tidak ada jam kerja pada hari ini
                      </Text>
                    </Group>

                    <ButtonDeleteWithConfirmation
                      isLoading={false}
                      onDelete={() => handleDeletePresenceRule(rule.id)}
                      description={""}
                      size={2.2}
                    />
                  </Group>
                )}
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

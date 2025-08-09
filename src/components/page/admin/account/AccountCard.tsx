"use client";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { Card, Stack, Text, Group, Badge, Divider, Flex } from "@mantine/core";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import LogoutButton from "./user/ButtonAccountLogout";

export default function AccountCard() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();
  const { user } = useLoggedInUser();

  if (!user) return null;

  return (
    <SimpleGridGlobal cols={1}>
      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />
      <SimpleGridGlobal cols={1} gap="20px">
        <Stack>
          <Divider />
          <Text fw={600} size="lg">
            {activeTab?.title}
          </Text>
        </Stack>
      </SimpleGridGlobal>
      <LoadingGlobal visible={isLoadingCompanies} />

      {/* Card untuk info user */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group p="apart" mb="sm" justify="space-between">
          <Badge color="blue" size="lg" variant="light" radius="sm">
            {user.role.toUpperCase()}
          </Badge>
          <LogoutButton />
        </Group>

        <Flex justify="space-between" align="center" w="100%" mt={30}>
          <Stack>
            <Text size="sm" fw={500}>
              Username:{" "}
              <Text span fw={700}>
                {user.username}
              </Text>
            </Text>
          </Stack>
          {/* <Stack>
            <Text size="sm" fw={500}>
              Role:{" "}
              <Text span fw={700}>
                {user.username}
              </Text>
            </Text>
          </Stack> */}

          <Text size="sm" c="dimmed">
            ID: {user.id}
          </Text>
        </Flex>
      </Card>

      {/* Tabs */}
    </SimpleGridGlobal>
  );
}

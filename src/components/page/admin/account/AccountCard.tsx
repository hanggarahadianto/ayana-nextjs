import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { Card, Stack, Text, Group, Badge, Flex } from "@mantine/core";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import LogoutButton from "./user/ButtonAccountLogout";

export default function AccountCard() {
  const { user } = useLoggedInUser();

  if (!user) return null;

  return (
    <SimpleGridGlobal cols={1}>
      {/* Card untuk info user */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group p="apart" mb="sm" justify="space-between">
          <Badge color="blue" size="lg" variant="light" radius="sm">
            {user.role.toUpperCase()}
          </Badge>
          <LogoutButton />
        </Group>

        <Flex justify="space-between" align="center" w="100%" mt={30}>
          <Stack gap={"40px"}>
            <Text fw={500} size="20px" mr={"30px"}>
              Username:{" "}
              <Text span fw={700} size="20px" ml={"4px"}>
                {user.username}
              </Text>
            </Text>
          </Stack>

          <Text size="sm" c="dimmed">
            ID: {user.id}
          </Text>
        </Flex>
      </Card>

      {/* Tabs */}
    </SimpleGridGlobal>
  );
}

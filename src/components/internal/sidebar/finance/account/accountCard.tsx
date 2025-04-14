import { getDataDebt } from "@/api/payout/getDataDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useMemo } from "react";
import AddAccountModal from "./addAccountModal";

export const AccountCard = ({ companyId }: { companyId: any }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getDebtByCompanyId", companyId],
    queryFn: () => getDataDebt(companyId),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalNominal = useMemo(() => {
    if (!data?.data) return 0;
    return data.data.reduce((sum: number, item: IPayout) => sum + item.nominal, 0);
  }, [data]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoading} />

      <Group justify="space-between" p={20}>
        <Stack>
          <Text size="lg" fw={600}>
            Account
          </Text>

          <Group mt="md"></Group>
        </Stack>
        <Stack>
          <AddAccountModal
            refetchAccountData={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Stack>
      </Group>
    </Card>
    // </Group>
  );
};

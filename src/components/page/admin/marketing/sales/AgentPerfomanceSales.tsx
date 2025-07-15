import { Card, Grid, GridCol, Skeleton, Stack } from "@mantine/core";
import SearchTable from "@/components/common/table/SearchTableComponent";
import PerformerSection from "./PerfomanceSection";

interface Props {
  data?: {
    top_performers: PerformerResponse[];
    under_performers: PerformerResponse[];
  };
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
  companyId: string;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
}

const AgentPerformSales = ({ data, isLoading, isFetching, onRefresh, companyId, startDate, endDate, setStartDate, setEndDate }: Props) => {
  return (
    <Card shadow="sm" padding="lg">
      <Stack>
        <SearchTable
          label="Cari Agent Marketing"
          companyId={companyId}
          searchTerm={""}
          setSearchTerm={() => {}}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly={false}
          useCategory={false}
          onRefresh={onRefresh}
          isFetching={isFetching}
          transactionType={null}
          debitAccountType={null}
          creditAccountType={null}
        />
        {isLoading ? (
          <Skeleton height={180} radius="md" />
        ) : (
          <Grid bg="#2e2e2e" p="40px" mt={"20px"}>
            <GridCol span={{ base: 12, md: 8 }}>
              <PerformerSection title="Top Performers" data={data?.top_performers || []} color="green" />
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
              <PerformerSection title="Under Performers" data={data?.under_performers || []} color="gray" />
            </GridCol>
          </Grid>
        )}
      </Stack>
    </Card>
  );
};

export default AgentPerformSales;

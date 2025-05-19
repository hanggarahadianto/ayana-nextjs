"use client";

import { Group, Text, Stack } from "@mantine/core";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import { useState } from "react";
import { CustomerTable } from "./GetMarketingTable";
import AddMarketingModal from "./AddMarketingModal";

const MarketingAdminCard = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  return (
    <>
      <SimpleGridGlobal cols={1}>
        {/* <LoadingGlobal visible={isLoadingProductData || isLoadingDeleteProduct} /> */}
        <Group justify="space-between" mb={20}>
          <Text fw={900} size="2rem">
            Daftar Konsumen
          </Text>
          <Stack>
            <AddMarketingModal />
          </Stack>
        </Group>
        <CustomerTable />
      </SimpleGridGlobal>
    </>
  );
};

export default MarketingAdminCard;

"use client";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import MarketingAdminCard from "./MarketingAdminCard";

export default function MarketingComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={false} />
      <MarketingAdminCard />
    </SimpleGridGlobal>
  );
}

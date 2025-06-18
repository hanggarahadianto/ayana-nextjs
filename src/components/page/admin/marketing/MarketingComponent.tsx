"use client";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import MarketingAdminCard from "./MarketingAdminCard";

export default function MarketingComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <MarketingAdminCard />
    </SimpleGridGlobal>
  );
}

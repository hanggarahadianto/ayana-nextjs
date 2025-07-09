"use client";

import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import HumanResourceAdminCard from "./HumanResourceAdminCard";

export default function HumanResourceComponent() {
  return (
    <SimpleGridGlobal cols={1}>
      <HumanResourceAdminCard />
    </SimpleGridGlobal>
  );
}

"use client";

import { useState } from "react";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import ClusterAdminCard from "./cluster/ClusterAdminCard";
import ProductAdminCard from "./cluster/product/ProductAdminCard";

const ProductAdminComponent = () => {
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  console.log("cluster id", selectedClusterId);

  return (
    <SimpleGridGlobal cols={1}>
      <ClusterAdminCard setSelectedClusterId={setSelectedClusterId} selectedClusterId={selectedClusterId ?? ""} />
      <ProductAdminCard selectedClusterId={selectedClusterId} />
    </SimpleGridGlobal>
  );
};

export default ProductAdminComponent;

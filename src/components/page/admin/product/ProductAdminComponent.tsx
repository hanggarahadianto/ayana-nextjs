"use client";

import { useState } from "react";
import ClusterAdminCard from "./cluster/ClusterAdminCard";
import ProductAdminCard from "./cluster/product/ProductAdminCard";
import { Divider, SimpleGrid } from "@mantine/core";

const ProductAdminComponent = () => {
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [selectedClusterName, setSelectedClusterName] = useState<string>("");

  return (
    <SimpleGrid cols={1}>
      <ClusterAdminCard
        setSelectedClusterId={setSelectedClusterId}
        setSelectedClusterName={setSelectedClusterName}
        selectedClusterId={selectedClusterId ?? ""}
        selectedClusterName={selectedClusterName}
      />
      <Divider mt={"40"} />
      <ProductAdminCard clusterId={selectedClusterId} />
    </SimpleGrid>
  );
};

export default ProductAdminComponent;

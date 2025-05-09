"use client";

import { useState } from "react";

import ClusterAdminCard from "./cluster/ClusterAdminCard";
import ProductAdminCard from "./cluster/product/ProductAdminCard";
import { Divider, SimpleGrid } from "@mantine/core";

const ProductAdminComponent = () => {
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  console.log("cluster id", selectedClusterId);

  return (
    <SimpleGrid cols={1}>
      <ClusterAdminCard setSelectedClusterId={setSelectedClusterId} selectedClusterId={selectedClusterId ?? ""} />
      <Divider mt={"40"} />
      <ProductAdminCard selectedClusterId={selectedClusterId} />
    </SimpleGrid>
  );
};

export default ProductAdminComponent;

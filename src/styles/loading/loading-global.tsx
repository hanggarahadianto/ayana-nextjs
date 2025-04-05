// components/common/LoadingGlobal.tsx

"use client";

import { LoadingOverlay } from "@mantine/core";

interface LoadingGlobalProps {
  visible: boolean;
}

const LoadingGlobal = ({ visible }: LoadingGlobalProps) => {
  return <LoadingOverlay visible={visible} loaderProps={{ color: "pink", size: "lg", variant: "bars" }} />;
};

export default LoadingGlobal;

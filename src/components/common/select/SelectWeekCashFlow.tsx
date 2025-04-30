import React, { useMemo } from "react";
import { Select } from "@mantine/core";

interface SelectWeekCashFlowReportProps {
  cashFlowData: ICashFlowUpdate[];
  value: any;
  onChange: (value: string | null) => void;
  error?: string;
}

const SelectWeekCashFlowReport: React.FC<SelectWeekCashFlowReportProps> = ({ cashFlowData, value, onChange, error }) => {
  // Mengambil data minggu yang pertama (earliest)
  //   const earliestCashFlow = useMemo(() => {
  //     return cashFlowData.sort((a, b) => Number(a.week_number) - Number(b.week_number))[0];
  //   }, [cashFlowData]);

  // Membuat options untuk Select
  const weekOptions = useMemo(() => {
    return cashFlowData.map((item) => ({
      label: `Minggu Ke ${item.week_number}`,
      value: item.week_number,
    }));
  }, [cashFlowData]);

  return (
    <>
      <Select label="Minggu Ke" placeholder="Pilih Minggu" value={value} onChange={onChange} data={weekOptions} error={error} required />
    </>
  );
};

export default SelectWeekCashFlowReport;

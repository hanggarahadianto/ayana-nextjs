import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";

type AvailableCashStatsProps = {
  companyId?: string;
  data: number;
};

export const AvaialbleCashStats = ({ data }: AvailableCashStatsProps) => {
  const statsData: StatItem[] = [
    {
      title: "Total Available Cash",
      icon: "receipt",
      value: data,
      color: "white",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};

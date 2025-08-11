// components/common/tab/GlobalTab.tsx

"use client";

import { Tabs } from "@mantine/core";

interface GlobalTabProps {
  data: ICompanyItem[];
  activeTab: string | null;
  onTabChange: (selected: ICompanyItem) => void;
}

const GlobalTab = ({ data, activeTab, onTabChange }: GlobalTabProps) => {
  return (
    <Tabs
      value={activeTab ?? ""}
      onChange={(value) => {
        const selected = data.find((item) => item.company_code === value);
        if (selected) onTabChange(selected);
      }}
    >
      <Tabs.List>
        {data.map((item) => (
          <Tabs.Tab key={item.company_code} value={item.company_code}>
            {item.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default GlobalTab;

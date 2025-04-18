import { useEffect, useState } from "react";
import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";

export default function UseCompanyTabs() {
  const { companies, isLoading: isLoadingCompanies } = useGetCompanies();
  const [activeTab, setActiveTab] = useState<ICompany | null>(null);

  useEffect(() => {
    if (companies.length > 0 && !activeTab) {
      setActiveTab(companies[0]);
    }
  }, [companies, activeTab]);

  const handleTabChange = (value: ICompany) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return {
    companies,
    isLoadingCompanies,
    activeTab,
    setActiveTab,
    handleTabChange,
  };
}

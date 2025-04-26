import { useEffect, useState } from "react";
import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";

export default function UseCompanyTabs() {
  const { companies, isLoading: isLoadingCompanies } = useGetCompanies();
  const [activeTab, setActiveTab] = useState<ICompany | null>(null);

  useEffect(() => {
    const storedTabCode = localStorage.getItem("activeCompanyTab");
    const storedCompany = companies.find((c) => c.company_code === storedTabCode);

    if (companies.length > 0 && !activeTab) {
      setActiveTab(storedCompany || companies[0]);
    }
  }, [companies, activeTab]);

  const handleTabChange = (value: ICompany) => {
    if (value) {
      setActiveTab(value);
      localStorage.setItem("activeCompanyTab", value.company_code); // Simpan persist
    }
  };

  return {
    companies,
    isLoadingCompanies,
    activeTab,
    setActiveTab: handleTabChange,
    handleTabChange,
  };
}

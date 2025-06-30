import { useEffect, useState } from "react";
import useGetCompanies from "@/components/common/tab/GetCompanyTab";

type CompanyFilter = Partial<Pick<ICompany, "has_customer" | "has_project" | "has_product">>;

export default function UseCompanyTabs(filter: CompanyFilter = {}) {
  const { companies, isLoading: isLoadingCompanies } = useGetCompanies();
  const [activeTab, setActiveTab] = useState<ICompany | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    // 🔍 Terapkan filter dinamis berdasarkan prop
    const filtered = companies.filter((company) => {
      return Object.entries(filter).every(([key, val]) => company[key as keyof CompanyFilter] === val);
    });

    setFilteredCompanies(filtered);

    const storedTabCode = localStorage.getItem("activeCompanyTab");
    const storedCompany = filtered.find((c) => c.company_code === storedTabCode);

    if (filtered.length > 0 && !activeTab) {
      setActiveTab(storedCompany || filtered[0]);
    }
  }, [companies, activeTab, JSON.stringify(filter)]); // depend on filter content

  const handleTabChange = (value: ICompany) => {
    if (value) {
      setActiveTab(value);
      localStorage.setItem("activeCompanyTab", value.company_code);
    }
  };

  return {
    companies, // full list
    filteredCompanies, // filtered result
    isLoadingCompanies,
    activeTab,
    setActiveTab: handleTabChange,
    handleTabChange,
  };
}

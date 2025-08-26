"use client";

import { useEffect } from "react";
import useGetCompanies from "@/components/common/tab/GetCompanyTab";
import { useCompanyStore } from "@/constants/company-store";

type CompanyFilter = Partial<Pick<ICompanyItem, "has_customer" | "has_project" | "has_product">>;

export default function UseCompanyTabs(filter: CompanyFilter = {}) {
  const { companies, isLoading } = useGetCompanies();
  const { companies: storeCompanies, setCompanies, setFilteredCompanies, setActiveTab, activeTab } = useCompanyStore();

  useEffect(() => {
    setCompanies(companies);

    // filter dinamis
    const filtered = companies.filter((company) => {
      return Object.entries(filter).every(([key, val]) => company[key as keyof CompanyFilter] === val);
    });
    setFilteredCompanies(filtered);

    const storedTabCode = localStorage.getItem("activeCompanyTab");
    const storedCompany = filtered.find((c) => c.company_code === storedTabCode);

    if (filtered.length > 0 && !activeTab) {
      setActiveTab(storedCompany || filtered[0]);
    }
  }, [companies, JSON.stringify(filter)]); // jangan depend ke activeTab biar ga loop

  return {
    ...useCompanyStore.getState(), // expose semua dari store
    isLoadingCompanies: isLoading,
  };
}

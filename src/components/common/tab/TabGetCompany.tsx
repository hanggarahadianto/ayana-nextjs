"use client";

import { useEffect } from "react";
import { useCompanyStore } from "@/constants/company-store";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";

type CompanyFilter = Partial<Pick<ICompanyItem, "has_customer" | "has_project" | "has_product">>;

export default function UseCompanyTabs(filter: CompanyFilter = {}) {
  const { user, isLoadingUser } = useLoggedInUser();
  const companies = user?.companies || [];
  const { companies: storeCompanies, setCompanies, setFilteredCompanies, setActiveTab, activeTab } = useCompanyStore();

  useEffect(() => {
    // 🔹 sort dulu sebelum diset
    const sortedCompanies = [...companies].sort((a, b) => Number(a.company_code) - Number(b.company_code));

    setCompanies(sortedCompanies);

    // filter dinamis
    const filtered = sortedCompanies.filter((company) => {
      return Object.entries(filter).every(([key, val]) => company[key as keyof CompanyFilter] === val);
    });
    setFilteredCompanies(filtered);

    const storedTabCode = localStorage.getItem("activeCompanyTab");
    const storedCompany = filtered.find((c) => c.company_code === storedTabCode);

    if (filtered.length > 0) {
      if (!activeTab || !filtered.some((c) => c.id === activeTab.id)) {
        // kalau activeTab tidak valid untuk filter ini, reset
        const newActive = storedCompany || filtered[0];
        setActiveTab(newActive);
        localStorage.setItem("activeCompanyTab", newActive.company_code);
      }
    }
  }, [companies, JSON.stringify(filter)]);

  return {
    ...useCompanyStore.getState(), // expose semua dari store
    isLoadingCompanies: isLoadingUser,
  };
}

"use client";

import { create } from "zustand";

interface CompanyStore {
  companies: ICompanyItem[];
  filteredCompanies: ICompanyItem[];
  activeTab: ICompanyItem | null;
  isLoadingCompanies: boolean;

  setCompanies: (companies: ICompanyItem[]) => void;
  setFilteredCompanies: (filtered: ICompanyItem[]) => void;
  setActiveTab: (company: ICompanyItem) => void;
  setIsLoadingCompanies: (loading: boolean) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  filteredCompanies: [],
  activeTab: null,
  isLoadingCompanies: false,

  setCompanies: (companies) => set({ companies }),
  setFilteredCompanies: (filteredCompanies) => set({ filteredCompanies }),
  setActiveTab: (company) => {
    localStorage.setItem("activeCompanyTab", company.company_code);
    set({ activeTab: company });
  },
  setIsLoadingCompanies: (loading) => set({ isLoadingCompanies: loading }),
}));

import { getDataCompany } from "@/api/company/getCompany";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useGetCompanies() {
  const { data: companyData, isLoading } = useQuery({
    queryKey: ["getCompanyData"],
    queryFn: getDataCompany,
    refetchOnWindowFocus: false,
  });

  const companies = useMemo(() => {
    return Array.isArray(companyData?.data) ? [...companyData.data].sort((a, b) => a.company_code.localeCompare(b.company_code)) : [];
  }, [companyData]);

  return { companies, isLoading };
}

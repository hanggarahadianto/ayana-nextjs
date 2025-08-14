import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import LoadingGlobal from "@/styles/loading/loading-global";
import { useLoggedInUser } from "@/lib/hook/useLoggedInUser";
import { CompanyByUserTable } from "./company/GetCompanyByUser";

export default function CompanyCard() {
  return (
    <>
      <CompanyByUserTable />
    </>
  );
}

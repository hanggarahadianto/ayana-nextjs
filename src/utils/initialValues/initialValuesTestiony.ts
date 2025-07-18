// utils/initialValues/initialValuesTestimony.ts

export function getInitialValuesCreateTestimony(companyId: string): ITestimonyCreate {
  return {
    customer_id: "",
    rating: 5,
    note: "",
    company_id: companyId,
  };
}

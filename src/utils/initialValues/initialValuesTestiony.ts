// utils/initialValues/initialValuesTestimony.ts

export function getInitialValuesCreateTestimony(companyId: string): ITestimonyCreate {
  return {
    customer_id: "",
    rating: 5,
    note: "",
    company_id: companyId,
  };
}

export function getInitialValuesUpdateTestimony(initialData: ITestimonyUpdate): ITestimonyUpdate {
  return {
    id: initialData.id,
    customer_id: initialData.customer_id,
    rating: initialData.rating,
    note: initialData.note,
    company_id: initialData.company_id,
  };
}

export const getInitialValuesEmployeeCreate = (companyId: string): IEmployeeCreate => ({
  name: "",
  address: "",
  phone: "",
  date_birth: "",
  department: "",
  company_id: companyId,
});

export const getInitialValuesUpdateEmployeeUpdate = (companyId: string, employee?: Partial<IEmployeeItem>): IEmployeeUpdate => ({
  id: employee?.id || "",
  name: employee?.name || "",
  address: employee?.address || "",
  phone: employee?.phone || "",
  company_id: employee?.company_id || companyId,
  date_birth: employee?.date_birth || "",
  department: employee?.department || "",
});

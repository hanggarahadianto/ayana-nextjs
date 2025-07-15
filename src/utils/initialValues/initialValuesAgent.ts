export const getInitialValueAgentCreate = (companyId: string): IEmployeeCreate => ({
  name: "",
  address: "",
  phone: "",
  gender: "",
  date_birth: "",
  religion: "-", // Optional field for religion
  department: "Marketing", // ✅ default to "Marketing"
  position: "-",
  employee_education: "-", // Optional field for education
  employee_status: "-", // Default status
  company_id: companyId,
  marital_status: "-",
  employee_contract_type: "-",
  is_agent: true,
});

export const getInitialValuesAgentUpdate = (companyId: string, employee?: Partial<IEmployeeItem>): IEmployeeUpdate => ({
  id: employee?.id || "",
  name: employee?.name || "",
  gender: employee?.gender || "",
  marital_status: employee?.marital_status || "",
  employee_contract_type: employee?.employee_contract_type || "",
  address: employee?.address || "",
  religion: employee?.religion || "", // Optional field for religion
  phone: employee?.phone || "",
  position: employee?.position || "",
  employee_education: employee?.employee_education || "", // Optional field for education
  employee_status: employee?.employee_status || "", // Default status
  company_id: employee?.company_id || companyId,
  date_birth: employee?.date_birth || "",
  department: employee?.department || "Marketing",
  is_agent: true,
});

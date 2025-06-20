export const getInitialValuesCreateCustomer = (companyId: string): ICustomerCreate => ({
  name: "",
  address: "",
  phone: "",
  status: "booking",
  payment_method: "cash",
  amount: 0,
  date_inputed: "",
  marketer: "",
  home_id: null,
  product_unit: "",
  bank_name: "",
  company_id: companyId,
});

export const getInitialValuesUpdateCustomer = (companyId: string, customer?: Partial<ICustomerItem>): ICustomerItem => ({
  id: customer?.id || "",
  name: customer?.name || "",
  address: customer?.address || "",
  phone: customer?.phone || "",
  status: customer?.status || "booking",
  payment_method: customer?.payment_method || "cash",
  amount: customer?.amount ? Number(customer.amount) : 0,
  marketer: customer?.marketer || "",
  date_inputed: customer?.date_inputed || "",
  home_id: customer?.home_id ?? null,
  created_at: customer?.created_at || new Date().toISOString(),
  updated_at: customer?.updated_at || new Date().toISOString(),
  home: customer?.home ?? null,
  product_unit: customer?.product_unit || "",
  bank_name: customer?.bank_name || "", // perbaikan tanda `|` jadi `||`
  company_id: customer?.company_id || companyId,
});

export const getInitialValuesCreateCustomer = (companyId: string): ICustomerCreate => ({
  name: "",
  address: "",
  phone: "",
  status: "booking",
  payment_method: "cash",
  amount: 0,
  date_inputed: "",
  home_id: null,
  product_unit: "",
  bank_name: "",
  company_id: companyId,
  marketer_id: "",
});

export const getInitialValuesUpdateCustomer = (
  companyId: string,
  customer?: Partial<ICustomerUpdateWithMarketer> // <- pakai ini
): ICustomerUpdateWithMarketer => ({
  id: customer?.id || "",
  name: customer?.name || "",
  address: customer?.address || "",
  phone: customer?.phone || "",
  status: customer?.status || "booking",
  payment_method: customer?.payment_method || "cash",
  amount: customer?.amount ? Number(customer.amount) : 0,
  marketer: customer?.marketer, // ✅ tambahan properti ini
  date_inputed: customer?.date_inputed || "",
  home_id: customer?.home_id ?? null,
  product_unit: customer?.product_unit || "",
  bank_name: customer?.bank_name || "",
  company_id: customer?.company_id || companyId,
  marketer_id: "",
});

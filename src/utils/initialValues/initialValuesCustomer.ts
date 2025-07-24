export const getInitialValuesCreateCustomer = (companyId: string): ICustomerCreate => ({
  name: "",
  address: "",
  phone: "",
  status: "",
  payment_method: "",
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
  customer: Partial<ICustomerUpdateWithMarketer> = {}
): ICustomerUpdateWithMarketer => {
  const {
    id = "",
    name = "",
    address = "",
    phone = "",
    status = "booking",
    payment_method = "cash",
    amount = 0,
    marketer,
    date_inputed = "",
    home_id = null,
    product_unit = "",
    bank_name = "",
    company_id = companyId,
  } = customer;

  return {
    id,
    name,
    address,
    phone,
    status,
    payment_method,
    amount: Number(amount),
    marketer,
    date_inputed,
    home_id,
    product_unit,
    bank_name,
    company_id,
    marketer_id: marketer?.id || "", // ✅ fix untuk masalah tipe
  };
};

export const initialValuesCustomer: ICustomerCreate = {
  name: "",
  address: "",
  phone: "",
  status: "", // default awal proses
  payment_method: "", // default metode pembayaran
  amount: 0, // default jumlah
  date_inputed: "",
  marketer: "",
  home_id: null,
};

export const getInitialValuesUpdateCustomer = (customer?: Partial<ICustomer>): ICustomer => ({
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
});

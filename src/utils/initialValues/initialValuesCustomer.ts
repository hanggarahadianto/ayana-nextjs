export const initialValuesCustomer: ICustomerCreate = {
  name: "",
  address: "",
  phone: "",
  status: "", // default value, bisa "pending" atau yang kamu pilih
  marketer: "",
  home_id: "",
};

export const getInitialValuesUpdateCustomer = (initialValuesCustomer?: Partial<ICustomerUpdate>): ICustomerUpdate => ({
  id: initialValuesCustomer?.id || "",
  name: initialValuesCustomer?.name || "",
  address: initialValuesCustomer?.address || "",
  phone: initialValuesCustomer?.phone || "",
  status: initialValuesCustomer?.status || "", // default status bisa disesuaikan
  marketer: initialValuesCustomer?.marketer || "",
  home_id: initialValuesCustomer?.home_id ?? null,
  home: initialValuesCustomer?.home ?? null,
});

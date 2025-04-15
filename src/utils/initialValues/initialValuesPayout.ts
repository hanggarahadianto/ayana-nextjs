export const initialValuePayoutCreate: IPayoutCreate = {
  invoice: "",
  nominal: 0,
  date_inputed: "",
  due_date: "",
  payment_date: "",
  note: "",
  company_id: "",
  category: "",
  mitra: "",
  status: "tunai",
};
export const initialValuePayoutUpdate: IPayoutUpdate = {
  id: "",
  invoice: "",
  nominal: 0,
  date_inputed: "",
  due_date: "",
  payment_date: "",
  note: "",
  category: "",
  mitra: "",
  status: "",
  company_id: "",
};
export const initialValuePayDebt: IPayoutUpdate = {
  id: "",
  invoice: "",
  nominal: 0,
  date_inputed: "",
  due_date: "",
  payment_date: null,
  note: "",
  category: "",
  mitra: "",
  status: "",
  company_id: "",
};

export const getInitialValuesUpdatePayout = (initialData: IPayoutUpdate) => ({
  id: initialData?.id || "",
  invoice: initialData?.invoice || "",
  nominal: initialData?.nominal || 0,
  date_inputed: initialData?.date_inputed || "",
  due_date: initialData?.due_date || "",
  payment_date: initialData.payment_date || null,
  company_id: initialData?.company_id || "",
  note: initialData?.note || "",
  category: initialData?.category || "",
  mitra: initialData?.mitra || "",
  status: initialData?.status || "",
});
export const getInitialValuesUpdatePaydDebt = (initialData?: IPayDebtUpdate) => ({
  id: initialData?.id || "",
  invoice: initialData?.invoice || "",
  payment_date: initialData?.payment_date || null,
  company_id: initialData?.company_id || "",
  status: "tunai",
});

export const initialAccountValues: IAccountCreate = {
  code: 0,
  name: "",
  type: "",
  category: "",
  description: "",
  company_id: "",
};

export const getInitialAccountValues = (initialValues?: IAccountUpdate): IAccountUpdate => ({
  id: initialValues?.id ?? "",
  code: initialValues?.code ?? 0,
  name: initialValues?.name ?? "",
  type: initialValues?.type ?? "",
  category: initialValues?.category ?? "",
  description: initialValues?.description ?? "",
  company_id: initialValues?.company_id ?? "",
});

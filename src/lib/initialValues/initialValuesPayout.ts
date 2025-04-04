import * as Yup from "yup";

export const initialValuePayoutCreate: IPayoutCreate = {
  invoice: "",
  nominal: 0,
  date_inputed: "",
  note: "",
  company_id: "",
};
export const initialValuePayoutUpdate: IPayoutUpdate = {
  id: "",
  invoice: "",
  nominal: 0,
  date_inputed: "",
  note: "",
  company_id: "",
};

export const validationSchemaPayout = Yup.object({
  location: Yup.string().required("Nama Lokasi harus diisi"),
  unit: Yup.string().required("Nama Blok harus diisi"),
  type: Yup.string().required("Nama Tipe harus diisi"),
  project_leader: Yup.string().required("Penanggung Jawab harus diisi"),
  investor: Yup.string().required("Investor harus diisi"),
  total_cost: Yup.number().required("Biaya Proyek harus diisi").positive("Biaya Proyek harus angka"),
  project_time: Yup.string().required("Durasi Project harus diisi"),
  project_start: Yup.string().required("Tanggal Mulai harus diisi"),
  project_end: Yup.string().required("Tanggal Selesai harus diisi"),
  note: Yup.string().optional(),
});

export const getInitialValuesUpdatePayout = (initialData: IPayoutUpdate) => ({
  id: initialData?.id || "",
  invoice: initialData?.invoice || "",
  nominal: initialData?.nominal || 0,
  date_inputed: initialData?.date_inputed || "",
  company_id: initialData?.company_id || "",
  note: initialData?.note || "",
});

import * as Yup from "yup";

export const getInitialValuesCreateProject = (companyId?: string) => ({
  project_name: "",
  location: "",
  type: "",
  unit: "",
  project_leader: "",
  investor: "",
  project_time: "",
  total_cost: 0,
  project_start: "",
  project_end: "",
  note: "",
  company_id: companyId ?? "", // ✅ fallback ke string kosong
});

export const validationSchemaProject = Yup.object({
  location: Yup.string().required("Nama Lokasi harus diisi"),
  unit: Yup.string().required("Nama Blok harus diisi"),
  type: Yup.string()
    .required("Tipe wajib diisi")
    .matches(/^\d{2,3} \/ \d{2,3}$/, "Format harus seperti 45 / 72"),
  project_leader: Yup.string().required("Penanggung Jawab harus diisi"),
  investor: Yup.string().required("Investor harus diisi"),
  total_cost: Yup.number().required("Biaya Proyek harus diisi").positive("Biaya Proyek harus angka"),
  project_time: Yup.string().required("Durasi Project harus diisi"),
  project_start: Yup.string().required("Tanggal Mulai harus diisi"),
  project_end: Yup.string().required("Tanggal Selesai harus diisi"),
  note: Yup.string().optional(),
});

export const getInitialValuesUpdateProject = (initialData?: IProjectUpdate, companyId?: string) => ({
  id: initialData?.id || "",
  project_name: initialData?.project_name || "",
  project_leader: initialData?.project_leader || "",
  investor: initialData?.investor || "",
  project_time: initialData?.project_time || "",
  total_cost: initialData?.total_cost || 0,
  project_start: initialData?.project_start ? new Date(initialData.project_start) : null,
  project_end: initialData?.project_end ? new Date(initialData.project_end) : null,
  type: initialData?.type || "",
  note: initialData?.note || "",
  company_id: initialData?.company_id || companyId || "", // fallback ke props
});

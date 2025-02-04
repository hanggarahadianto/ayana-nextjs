import * as Yup from "yup";

export const initialValueProjectCreate: IProjectCreate = {
  project_name: "",
  location: "",
  type: "",
  unit: "",
  project_leader: "",
  project_time: "",
  total_cost: 0,
  project_start: "",
  project_end: "",
  note: "",
};

export const validationSchemaProject = Yup.object({
  location: Yup.string().required("Nama Lokasi is required"),
  unit: Yup.string().required("Nama Blok is required"),
  type: Yup.string().required("Nama Tipe is required"),
  project_leader: Yup.string().required("Penanggung Jawab is required"),
  total_cost: Yup.number().required("Biaya Proyek is required").positive("Biaya Proyek must be a positive number"),
  project_time: Yup.string().required("Durasi Project is required"),
  project_start: Yup.string().required("Tanggal Mulai is required"),
  project_end: Yup.string().required("Tanggal Selesai is required"),
  note: Yup.string().optional(),
});

export const getInitialValuesUpdateProject = (initialData: IProjectUpdate) => ({
  id: initialData.id || "",
  project_name: initialData.project_name || "",
  project_leader: initialData.project_leader || "",
  project_time: initialData.project_time || "",
  total_cost: initialData.total_cost || 0,
  project_start: initialData.project_start || "",
  project_end: initialData.project_end || "",
  type: initialData.type || "",
  note: initialData.note || "",
});

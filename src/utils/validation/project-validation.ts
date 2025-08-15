import * as Yup from "yup";

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
  project_status: Yup.string().required("Status proyek harus diisi"),
  note: Yup.string().required("Keterangan proyek harus diisi"),
});
